import { useEffect, useState } from "react";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import DisplayQuestion from "../components/CodeSubmission/DisplayQuestion";
import axios from "axios";

import CodeEditor from "../components/CodeSubmission/CodeEditor";
import { Language, languages } from "../utils/languages";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ThemeDropdown from "../components/ThemeDropdown";
import { defineTheme, Theme } from "../utils/defineTheme";
import LanguagesDropdown from "../components/LanguagesDropdown";
import DropdownBar from "../components/DropdownBar";
import CodeOutput from "../components/CodeOutput";
import CompileButton from "../components/CompileButton";
import Sidebar from "../components/Sidebar";

const javascriptDefault = `// some comment`;

const CodeSubmission = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [theme, setTheme] = useState<Theme>({
    value: "cobolt",
    label: "cobolt",
  });
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [outputDetails, setOutputDetails] = useState(null);

  const questions = useSelector((state: RootState) => state.questions);
  const [taskIndex, setTaskIndex] = useState<number>(0);

  const onChange = (data) => {
    setCode(data);
  };

  useEffect(() => {
    defineTheme("brilliance-black").then((_) =>
      setTheme({ value: "brilliance-black", label: "Brilliance Black" })
    );
  }, []);

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(""),
    };
    const options = {
      method: "POST",
      url: "http://localhost:2358/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "http://localhost:2358/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);

        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const getOutput = () => {
    if (outputDetails === null) return;
    let statusId = outputDetails?.status?.id;

    let msg = atob(outputDetails?.stdout);
    console.log(msg);
    //let solution = questions.questions[taskIndex].solution;

    //if (msg.trim() === solution.trim()) console.log("CORRECT!");

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-md text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      console.log("GALLO");
      setTheme(theme);
    } else {
      console.log("GALLO");
      defineTheme(theme.value)
        .then((_) => {
          console.log(theme);
          setTheme(theme);
        })
        .catch((err) => console.log(err));
    }
  }

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  return (
    <Container>
      <Card width="w-3/4">
        <Header title="Submit solution" size="4xl" />
        <DisplayQuestion
          questions={questions.questions}
          taskIndex={taskIndex}
          setTaskIndex={setTaskIndex}
        />

        <Container>
          <CodeEditor
            code={code}
            theme={theme.value}
            language={language.value}
            onChange={onChange}
          />
          <Sidebar
            handleCompile={handleCompile}
            processing={processing}
            output={getOutput}
          />
        </Container>

        <DropdownBar
          handleThemeChange={handleThemeChange}
          theme={theme}
          onSelectChange={onSelectChange}
        />
      </Card>
    </Container>
  );
};

export default CodeSubmission;

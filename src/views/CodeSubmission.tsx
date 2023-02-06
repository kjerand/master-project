import { useState } from "react";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import DisplayQuestion from "../components/CodeSubmission/DisplayQuestion";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const CodeSubmission = () => {
  const [code, setCode] = useState(``);
  return (
    <Container>
      <Card>
        <Header title="Submit solution" size="4xl" />
        <DisplayQuestion />
        <Header title="Solution" size="md" />
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </Card>
    </Container>
  );
};

export default CodeSubmission;

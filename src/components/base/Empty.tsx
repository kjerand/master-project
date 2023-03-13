import Card from "./Card";
import Header from "./Header";
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";

const Empty = ({ goBack }: { goBack: Function }) => {
  return (
    <Card width="w-1/2" goBack={goBack}>
      <div className="my-12">
        <div className="flex items-center m-auto w-1/2">
          <ContentPasteOffOutlinedIcon
            className="m-auto mb-10"
            style={{
              width: 60,
              height: 60,
            }}
          />
        </div>
        <Header title="No questions added yet" size="text-xl" />
      </div>
    </Card>
  );
};

export default Empty;

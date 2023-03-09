import Card from "./Card";
import Header from "./Header";
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";

const Empty = () => {
  return (
    <Card width="w-3/4 py-12">
      <div className="flex items-center m-auto">
        <ContentPasteOffOutlinedIcon
          className="m-auto mb-10"
          style={{
            width: 60,
            height: 60,
          }}
        />
      </div>
      <Header title="No questions added yet" size="text-xl" />
    </Card>
  );
};

export default Empty;

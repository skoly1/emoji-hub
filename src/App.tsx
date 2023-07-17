import React, { useEffect, useState } from "react";
import "./App.scss";
import EmojiContainer from "./components/EmojiContainer";
import fetchEmojiData from "./api";
import { Form, Spinner } from "react-bootstrap";

function App() {
  const [emojiData, setEmojiData] = useState();
  const [emojiHardDataCopy, setEmojiHardDataCopy] = useState<any>([]);
  const [uniqueCategories, setUniqueCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const onCategoryChange = (category: any) => {
    setPage(1);
    if (category.target.value) {
      const filteredData = emojiHardDataCopy?.filter((e: any) => {
        return e.category === category.target.value;
      });
      setEmojiData(filteredData);
    } else {
      setEmojiData(emojiHardDataCopy);
    }
  };

  const init = async () => {
    setLoading(true);
    const response = await fetchEmojiData();
    setEmojiData(response);
    setEmojiHardDataCopy(response);
    const uniqueCategories: any = Array.from(
      new Set(response.map((item: any) => item.category))
    );
    setUniqueCategories(uniqueCategories);
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="loader">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
      {!loading && (
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="dropdown">
              <Form.Select
                aria-label="Default select example"
                size="sm"
                onChange={(e: any) => onCategoryChange(e)}
              >
                <option value="">Select Category</option>

                {uniqueCategories?.map((e: any) => {
                  return (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="flex-fill"></div>
          </div>
          {emojiData && (
            <EmojiContainer
              itemsPerPage={10}
              emojiData={emojiData}
              setLoading={setLoading}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

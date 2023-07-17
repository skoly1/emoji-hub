import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "./styles/emoji.scss";

const EmojiContainer = ({
  itemsPerPage,
  emojiData,
  setLoading,
  page,
  setPage,
}: any) => {
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const dataHardCopy: any = [...emojiData];
    const indexOfLastData = page * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentItems = dataHardCopy.slice(indexOfFirstData, indexOfLastData);
    setPageData(currentItems);
    setLoading(false);
  }, [emojiData, itemsPerPage, page, setLoading]);

  return (
    <>
      <Row className="justify-content-center">
        {pageData?.map((item: any) => {
          return (
            <div
              className="col col-md-2"
              key={item.name}
              style={{
                minWidth: "260px",
                minHeight: "260px",
                padding: "1rem",
              }}
            >
              <Card
                style={{
                  height: "100%",
                }}
              >
                <Card.Body>
                  <div className="row p-0 m-1">
                    <span style={{ fontSize: "5rem" }}>
                      {String.fromCodePoint(
                        parseInt(item.unicode[0].substring(2), 16)
                      )}
                    </span>
                  </div>

                  <div className="row"></div>
                  <Card.Title className="title">
                    {
                      (
                        item.name.charAt(0).toUpperCase() + item.name.slice(1)
                      )?.split("≊")[0]
                    }
                  </Card.Title>
                  <Row>
                    <Col className="type">Category:</Col>
                    <Col className="value-class">{item.category}</Col>
                  </Row>
                  <Row>
                    <Col className="type">Group:</Col>
                    <Col className="value-class">{item.group}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Row>
      <div>
        <PaginationControl
          page={page}
          between={4}
          total={emojiData.length - 1}
          limit={itemsPerPage}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={1}
        />
      </div>
    </>
  );
};

export default EmojiContainer;

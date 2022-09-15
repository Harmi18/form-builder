import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const data = [
  {
    name: "Input",
    id: "1",
    content: <input type="text" />,
  },
  {
    name: "Button",
    id: "2",
    content: <button>I'm a button</button>,
  },
  {
    name: "Image",
    id: "3",
    content: (
      <img src="https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/e/e6/Site-logo.png/revision/latest?cb=20210530110654" />
    ),
  },
  {
    name: "Select",
    id: "4",
    content: (
      <select>
        <option>Op1</option>
        <option>Op2</option>
      </select>
    ),
  },
];
const dat1a = [];
const reOrder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;
const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;
const dragElement = [];
function App() {
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([]);
  useEffect(() => {
    setItems(data);
    setItems1(dat1a);
  }, []);
  const onDragEnd = (result) => {
    if (!result.destination || result.destination.droppableId === "dragdr") {
      return;
    }

    setItems1((prev) => [...prev, items[(items.content, result.source.index)]]);

    const reOrderedItems = reOrder(
      items,
      result.source.index,
      result.destination.index
    );
    console.log(reOrder);
    setItems(reOrderedItems);
  };
  return (
    <main>
      <section className="container">
        <DragDropContextContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <ListGrid>
              <Droppable dropDisabled droppableId="dragdr">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>

              <Droppable dropDisabled droppableId="abc">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items1.map((item, index) => (
                      <Draggable
                        key={index}
                        draggableId={item.name}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </ListGrid>
          </DragDropContext>
        </DragDropContextContainer>
      </section>
    </main>
  );
}

export default App;

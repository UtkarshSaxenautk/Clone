import React, { useRef, useState } from 'react';
import { data } from '../assets/data.js';

const board_columns = {
  todo: 'To Do',
  progress: 'On Progress',
  completed: 'Done',
};

function Kanban() {
  const [todos, setTodos] = useState(data);
  const board_columns_map = Object.keys(board_columns);
  const draggedTodoItem = useRef(null);
  const touchStartPosition = useRef({ x: 0, y: 0 });

  const handleDrop = (column) => {
    const index = todos.findIndex((todo) => todo.id === draggedTodoItem.current);
    const tempTodos = [...todos];
    tempTodos[index].column = column;
    setTodos(tempTodos);
  };

  const handleDragStart = (e, todoId) => {
    draggedTodoItem.current = todoId;
    e.target.style.cursor = 'grabbing';
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    draggedTodoItem.current = null;
    e.target.style.opacity = '1';
  };

  const handleTouchStart = (e, todoId) => {
    draggedTodoItem.current = todoId;
    touchStartPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    e.target.style.cursor = 'grabbing';
    e.target.style.opacity = '0.5';
  };

  const handleTouchMove = (e) => {
    if (draggedTodoItem.current) {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - touchStartPosition.current.x;
      const deltaY = touchY - touchStartPosition.current.y;
      e.target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (draggedTodoItem.current) {
      draggedTodoItem.current = null;
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-[15px]">
      {board_columns_map.map((column) => (
        <div
          className="flex-1 flex-grow px-5 py-5 rounded-2xl bg-neutral-100"
          key={column}
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  column === 'todo'
                    ? 'bg-[#5030e5]'
                    : column === 'progress'
                    ? 'bg-[#ffa500]'
                    : column === 'completed'
                    ? 'bg-[#76a5ea]'
                    : ''
                }`}
              ></div>
              <h5 className="text-base font-medium font-inter text-[#0d062d]">
                {board_columns[column]}
              </h5>
              <div className="w-5 h-5 bg-[#e0e0e0] rounded-[10px] text-center pt-[1px] text-[12px] font-inter font-medium text-[#625F6D] ml-1">
                {todos.filter((todo) => todo.column === column).length}
              </div>
            </div>
            {column === 'todo' && (
              <img
                src="icons/add-square-purple.png"
                alt=""
                className="w-5 h-5"
              />
            )}
          </div>
          <div
            className={`w-full border-[3px] ${
              column === 'todo'
                ? 'border-[#5030e5]'
                : column === 'progress'
                ? 'border-[#ffa500]'
                : column === 'completed'
                ? 'border-[#8bc48a]'
                : ''
            } mt-[22px] mb-7`}
          ></div>

          <div
            className="h-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(column)}
            onTouchStart={(e) => handleTouchStart(e, null)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e)}
          >
            {todos
              .filter((todo) => todo.column === column)
              .map((todo) => (
                <div
                  key={todo.id}
                  className="flex flex-col p-5 mb-5 bg-white rounded-2xl"
                  draggable={!('ontouchstart' in window)}
                  onDragStart={(e) => handleDragStart(e, todo.id)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  style={{
                    cursor: 'grab',
                    userSelect: 'none',
                    touchAction: 'none',
                  }}
                >
                  <div className="flex flex-row justify-between mb-1">
                    <div
                      className={`rounded-md ${
                        column === 'completed'
                          ? 'bg-[#83C29D33]/[.20] text-[#68B266]'
                          : todo.task_priority === 0
                          ? 'bg-[#DFA874]/[.20] text-[#D58D49]'
                          : todo.task_priority === 2
                          ? 'bg-[#D8727D1A]/[.10] text-[#D8727D]'
                          : ''
                      } px-[6px] py-[4px]`}
                    >
                      <div className="text-xs font-inter font-[500]">
                        {' '}
                        {column === 'completed'
                          ? 'Completed'
                          : todo.task_priority === 0
                          ? 'Low'
                          : todo.task_priority === 2
                          ? 'High'
                          : ''}
                      </div>
                    </div>

                    <img src="icons/dot.png" alt="" className="w-4 my-auto" />
                  </div>

                  <div className="text-lg font-semibold mb-[6px]">
                    {todo.title}
                  </div>
                  {todo.description && (
                    <div className="text-xs font-normal text-gray-600">
                      {todo.description}
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-3">
                    {todo.images &&
                      todo.images.length > 0 &&
                      todo.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.image}
                          alt=""
                          className="object-contain overflow-hidden"
                        />
                      ))}
                  </div>

                  <div className="flex flex-row justify-between mt-7">
                    <div className="flex flex-row items-center justify-end">
                      <div className="flex items-center -space-x-1 ring-white ring-1">
                        {todo.assignees.map((assignee, index) => (
                          <img
                            key={index}
                            src={assignee.avatars}
                            alt=""
                            className="h-6"
                            style={{ zIndex: todo.assignees.length - index }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-row gap-[14px]">
                      <div className="flex flex-row items-center justify-between gap-[5px]">
                        <img
                          src="icons/comments.png"
                          alt="comment"
                          className="w-4 h-4"
                        />
                        <div className="text-xs font-medium text-gray-600">
                          {todo.comments} comments
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-between gap-[5px]">
                        <img
                          src="icons/folder-2.png"
                          alt="comment"
                          className="w-4 h-4"
                        />
                        <div className="text-xs font-medium text-gray-600">
                          {todo.files} files
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Kanban;

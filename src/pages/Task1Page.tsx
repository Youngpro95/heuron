import React from 'react';
import Task1 from '../components/Task1/_components/Task1';
import { ImageProvider } from '../components/Task1/_components/ImageContent';

function Task1Page() {
  return (
    <ImageProvider>
      <Task1 />
    </ImageProvider>
  );
}

export default Task1Page;

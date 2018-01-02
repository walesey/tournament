import React from 'react';

const Icon = ({ svg }) => (
  <i dangerouslySetInnerHTML={{__html: svg }} />
);

export default Icon;
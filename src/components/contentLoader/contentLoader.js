import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={props.w}
    height={props.h}
    viewBox={'0 0 ' + props.w + ' ' + props.h}
    backgroundColor="#e3e3e3"
    foregroundColor="#cdcbcb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width={props.w} height={props.h} />
  </ContentLoader>
);

export default MyLoader;

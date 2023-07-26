import React from 'react';


const IframeContainer = (props:{url: string}) => (
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  <iframe
    id="iframe"
    name="IframeContainer"
    src={props.url}
    scrolling="auto"
    style={{
      width: 'calc(100%)',
      height: 'calc(100% - 145px)',
      border: 'none',
      position: 'absolute',
    }}
  />
);

export const IframeContainer2 = (props:{url: string}) => (
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  <iframe
    id="iframe"
    name="IframeContainer"
    src={props.url}
    scrolling="auto"
    style={{
      width: 'calc(100%)',
      height: 'calc(100% - 48px)',
      border: 'none',
      position: 'absolute',
    }}
  />
);




export default IframeContainer;

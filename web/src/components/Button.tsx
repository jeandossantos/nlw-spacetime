import React from 'react';

interface ButtonProps {
  text: string;
}

export default function Button(props: ButtonProps) {
  return <button>{props.text}</button>;
}

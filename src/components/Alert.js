import React from 'react'

export default function Alert(props) {
  // function typeCapitalize(word) {
  //   let text = word.toLowerCase();
  //   const capitalize = text.charAt(0).toUpperCase() + text.slice(1);
  //   // console.log(capitalize);
  //   return capitalize;
  // }
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${
            props.alert.type
          } alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.type}</strong> {props.alert.msg}
        </div>
      )}
    </div>
  )
}

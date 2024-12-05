import React from 'react'

function CheckBox({ Label, onChange, Name, Value, checkid }) {
  return (
    <div className="flex-wrap mt-1 mx-2">
      <label className="text-pos-cen">
        <input
          type="checkbox"
          placeholder="Show Password"
          onChange={onChange}
          value={Value}
          className="mt-2 p-1"
          name={Name}
          checked={checkid == 1 ? true : false}
        />
        <span className="f-4">{`  ${Label}`}</span>
      </label>
    </div>
  );
}
export default CheckBox
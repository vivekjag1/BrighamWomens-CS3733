import React from "react";

interface EmployeeCardProps {
  imageSrc: string;
  name: string;
  role: string;
}

function EmployeeCard({ imageSrc, name, role }: EmployeeCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/*<div className="rounded-full overflow-hidden border-4 border-400  w-40 h-40 flex items-center justify-center">*/}
      <img
        className="w-25 h-40 object-cover rounded-full"
        src={imageSrc}
        alt={name}
      />
      {/*</div>*/}
      <label className="font-semibold">{name}</label>
      <label>{role}</label>
    </div>
  );
}

export default EmployeeCard;

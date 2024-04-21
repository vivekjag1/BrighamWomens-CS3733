import React from "react";

interface EmployeeCardProps {
  imageSrc: string;
  name: string;
  role: string;
}

function EmployeeCard({ imageSrc, name, role }: EmployeeCardProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        className="w-25 h-40 object-cover rounded-full"
        src={imageSrc}
        alt={name}
      />
      <label className="font-semibold">{name}</label>
      <label>{role}</label>
    </div>
  );
}

export default EmployeeCard;

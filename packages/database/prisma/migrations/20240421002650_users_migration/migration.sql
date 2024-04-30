/*
  Warnings:

  - Added the required column `email` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE employee_employeeid_seq;
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "employeeID" SET DEFAULT nextval('employee_employeeid_seq');
ALTER SEQUENCE employee_employeeid_seq OWNED BY "Employee"."employeeID";

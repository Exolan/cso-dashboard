import xlsx from "xlsx";
import { DashboardData, Program, ProgramData } from "../types/types";

export function dashboardService(url: string): DashboardData | void {
  const wb = xlsx.readFile(url);
  const ws = wb.Sheets[wb.SheetNames[0]];

  const sheetData: any[][] = xlsx.utils.sheet_to_json(ws, { header: 1 });

  const [titleRow, columnsRow, ...dataRows] = sheetData;

  if (!titleRow || !columnsRow || dataRows.length === 0) {
    return;
  }

  const title: string = titleRow[0];

  console.log(columnsRow);
  /*[
    <1 empty item>,
    'план (включая отклонение - 10%)',
    'факт',
    'процент выполнения',
    'остаток '
]*/
  console.log(dataRows);
  /* [
  [ 'ППК', 52502.4, 0, 0, 58336 ],
  [ 'Проф.переподготовка', 18192.6, 0, 0, 20214 ],
  [ 'Мероприятия', 98.1, 0, 0, 109 ],
  [ 'Оценка компетенций', 90, 0, 0, 100 ]
]*/

  const programs: Program[] = [];

  for (const row of dataRows) {
    const programName: string = row[0];
    const programData: ProgramData[] = [];

    for (let i = 0; i < columnsRow.length; i++) {
      if (!columnsRow[i]) {
        continue;
      }
      const data: ProgramData = {
        dataName: columnsRow[i],
        dataValue: row[i],
      };
      programData.push(data);
    }
    programs.push({ programName: programName, programData: programData });
  }

  return { title, programs };
}

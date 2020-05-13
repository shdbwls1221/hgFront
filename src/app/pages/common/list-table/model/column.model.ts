export class Column {
  columnDef: string;		// 컬럼명 (team)
  key: string;					// 객체 속성명 (무한 Depth: team.id)
  columnName: string;		// 화면의 컬럼명 (소속팀)
  columnSize?: string;	// 화면의 컬럼길이 (70px)
	letter?: any[];
}
export class FormField {
  label: string;				// 필드명 (화면에 보여지는 라벨명 - team)
  key: string;					// 컬럼명	(객체 속성명 - team)
  type: string;					// Form 타입 (text, select, search)
  letter?: string;			// search 타입에서 객체 선택 시 화면에 보여지는 글자 (name[팀명 보여줄 경우])
  searchModel?: string; // search 타입에서 Parent 객체 클래스명 (Team) 
  id?: string;          // search 타입에서 Parent 객체의 pk 변수명 (id, trgId ...)
}
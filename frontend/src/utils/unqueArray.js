export default function uniqueArray(list) {
  //set 은 원소들이 겹치지 않는 배열
  return Array.from(new Set(list));
}

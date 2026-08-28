/**
 * 국내 전화번호 입력 포맷터.
 *
 * 숫자만 남긴 뒤 자리수에 따라 끊으므로, 사용자가 하이픈을 직접 넣든 말든 결과가 같다.
 * 입력 도중·삭제 도중의 중간 상태도 그대로 통과시켜 커서가 튀지 않는다.
 * 서울 국번(02)만 지역번호가 2자리라 따로 분기한다.
 */
export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  // 02-XXX-XXXX (9자리) / 02-XXXX-XXXX (10자리)
  if (digits.startsWith("02")) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  // 010-XXXX-XXXX (11자리) / 0XX-XXX-XXXX (10자리)
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

/**
 * Get today's date in MM-DD format
 * @returns {string} Date in MM-DD format
 */
export function getTodayMMDD() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

/**
 * Check if a day is unlocked (past or today)
 * @param {string} dayMMDD - Date in MM-DD format
 * @returns {boolean} True if unlocked
 */
export function isUnlocked(dayMMDD) {
  const today = new Date();
  const todayMMDD = getTodayMMDD();
  
  // Parse the day
  const [month, day] = dayMMDD.split('-').map(Number);
  const dayDate = new Date(today.getFullYear(), month - 1, day);
  
  // Parse today
  const [todayMonth, todayDay] = todayMMDD.split('-').map(Number);
  const todayDate = new Date(today.getFullYear(), todayMonth - 1, todayDay);
  
  // Day is unlocked if it's today or in the past
  return dayDate <= todayDate;
}

/**
 * Check if we're before February 7
 * @returns {boolean} True if before Feb 7
 */
export function isBeforeValentinesWeek() {
  const today = new Date();
  const todayMMDD = getTodayMMDD();
  const [month, day] = todayMMDD.split('-').map(Number);
  
  // Before February 7
  if (month < 2) return true;
  if (month === 2 && day < 7) return true;
  return false;
}

/**
 * Check if today is February 14
 * @returns {boolean} True if today is Feb 14
 */
export function isFebruary14() {
  const todayMMDD = getTodayMMDD();
  return todayMMDD === '02-14';
}

/**
 * Get countdown to February 7
 * @returns {Object} Object with days, hours, minutes, seconds
 */
export function getCountdownToFeb7() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const feb7 = new Date(currentYear, 1, 7); // Month is 0-indexed, so 1 = February
  
  // If Feb 7 has passed this year, target next year
  if (feb7 < today) {
    feb7.setFullYear(currentYear + 1);
  }
  
  const diff = feb7 - today;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

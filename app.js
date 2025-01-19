const addButton = document.getElementById("new-costumer");
const nameInput = document.getElementById("name-input");
const dateInput = document.getElementById("date-input"); // ליצור עם משתנה זה תאריך חדש
const list = document.getElementById("card-owners");
const modal = document.querySelector(".cancellation");
const modal2 = document.querySelector(".remove");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const overlay = document.querySelector(".overlay"); // עבור רקע מעורפל
const removeButton = document.createElement("button"); // הוספתי את הכפתור למקום הנכון
removeButton.textContent = "X"; // הגדרת טקסט לכפתור
removeButton.id = "remove";
const del = document.getElementById("delete");
const undel = document.getElementById("undelete");
let currentCheckbox = null;
let currentLi = null; // משתנה גלובלי לאחסון ה-li הנוכחי

// הצגת חלון הביטול אם מנסים לבטל סימון
list.addEventListener("change", (event) => {
  if (event.target.classList.contains("check")) {
    const checkbox = event.target;
    if (!checkbox.checked) {
      currentCheckbox = checkbox; // שומר את הצ'קבוקס הנוכחי
      modal.style.display = "flex"; // מציג את החלון
      overlay.style.display = "block"; // מציג את הרקע המעורפל
    }
  }
});

// אישור הביטול
yesButton.addEventListener("click", () => {
  if (currentCheckbox) {
    currentCheckbox.checked = false; // ביטול הסימון
  }
  closeModal();
});

// ביטול הפעולה (הסימון נשאר)
noButton.addEventListener("click", () => {
  if (currentCheckbox) {
    currentCheckbox.checked = true; // משאיר את הסימון
  }
  closeModal();
});

// סגירת החלון
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none"; // מסיר את הרקע המעורפל
  currentCheckbox = null;
}

function closeModal2() {
  modal2.style.display = "none";
  overlay.style.display = "none";
  currentLi = null; // אפס את המשתנה אחרי סגירת החלון
}

// הוספת לקוח חדש
addButton.addEventListener("click", function () {
  // יצירת אלמנט ה-li
  const li = document.createElement("li");

  // יצירת שם והוספתו
  const name = document.createElement("strong");
  name.textContent = nameInput.value;

  // יצירת התאריך
  const div = document.createElement("div");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  div.appendChild(span1);
  div.appendChild(span2);
  span1.textContent = "Purchased on: ";
  span2.textContent = dateInput.value;

  // יצירת שדות הצ'קבוקס
  const checkContainer = document.createElement("div");
  checkContainer.classList.add("check-container");

  // יצירת שורה ראשונה של צ'קבוקסים
  const checkRow1 = document.createElement("div");
  checkRow1.classList.add("check-row");
  for (let i = 0; i < 5; i++) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("check");
    checkRow1.appendChild(checkBox);
  }

  // יצירת שורה שנייה של צ'קבוקסים
  const checkRow2 = document.createElement("div");
  checkRow2.classList.add("check-row");
  for (let i = 0; i < 5; i++) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("check");
    checkRow2.appendChild(checkBox);
  }

  checkContainer.appendChild(checkRow1);
  checkContainer.appendChild(checkRow2);

  // יצירת כפתור למחיקה
  removeButton.addEventListener("click", function () {
    currentLi = li; // שומר את ה-li הנוכחי
    modal2.style.display = "flex"; // מציג את חלון האישור
    overlay.style.display = "block"; // מציג את הרקע המעורפל
  });

  // הוספת כל האלמנטים ל-li
  li.appendChild(name);
  li.appendChild(div);
  li.appendChild(checkContainer);
  li.appendChild(removeButton);

  // הוספת ה-li לרשימה
  list.appendChild(li);

  // ניקוי הקלטים לאחר הוספת הלקוח
  nameInput.value = "";
  dateInput.value = "";
});

// מחיקת ה-li כאשר לוחצים על YES בחלון האישור
del.addEventListener("click", () => {
  if (currentLi) {
    currentLi.remove(); // מחיקת ה-li הרלוונטי
    closeModal2();
  }
});

// סגירת חלון האישור בלי למחוק
undel.addEventListener("click", () => {
  closeModal2();
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }, { passive: true });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
    }, { passive: true });
  });

  // Smooth scroll performance tweak
  window.addEventListener('touchmove', () => {}, { passive: true });

  // ---- Calendar Functionality ----
  const calendar = document.getElementById('calendar');
  const currentMonthElement = document.getElementById('current-month');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const selectedDateElement = document.getElementById('selected-date');
  const selectedDateText = document.getElementById('selected-date-text');
  const bookingForm = document.getElementById('booking-form');
  const successModal = document.getElementById('success-modal');
  const closeModal = document.getElementById('close-modal');
  const submitBooking = document.getElementById('submit-booking');

  if (calendar) {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = null;

    // Your booked dates list
    const bookedDates = [
      '2025-10-12',
      '2025-10-19',
      '2025-12-01',
      '2025-01-05'
    ];

    // Function to render calendar
    function renderCalendar(month, year) {
      calendar.innerHTML = '';
      currentMonthElement.textContent = new Date(year, month)
        .toLocaleString('default', { month: 'long', year: 'numeric' });

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
      });

      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendar.appendChild(emptyCell);
      }

      const today = new Date();
      for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = day;

        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dateElement.classList.add('today');
        }

        if (bookedDates.includes(dateString)) {
          dateElement.classList.add('booked');
        } else {
          dateElement.classList.add('available');
          dateElement.addEventListener('click', function() {
            document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            selectedDate = new Date(year, month, day);
            selectedDateText.textContent = selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            selectedDateElement.style.display = 'block';
            bookingForm.style.display = 'block';
            bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
          });
        }

        calendar.appendChild(dateElement);
      }
    }

    // Render initial calendar
    renderCalendar(currentMonth, currentYear);

    prevMonthButton.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
      selectedDateElement.style.display = 'none';
      bookingForm.style.display = 'none';
    });

    nextMonthButton.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
      selectedDateElement.style.display = 'none';
      bookingForm.style.display = 'none';
    });

    // ---- Booking Submit ----
    submitBooking.addEventListener('click', function() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const eventType = document.getElementById('event-type').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !phone || !eventType || !selectedDate) {
        alert('Please fill in all required fields and select a date.');
        return;
      }

      const bookedDateStr = selectedDate.toISOString().split('T')[0];

      // Mark the date as booked immediately
      if (!bookedDates.includes(bookedDateStr)) {
        bookedDates.push(bookedDateStr);
      }

      // Re-render calendar so date becomes red instantly
      renderCalendar(currentMonth, currentYear);

      // Show success modal
      successModal.style.display = 'flex';

      // Reset form
      bookingForm.reset();
      selectedDateElement.style.display = 'none';
      bookingForm.style.display = 'none';
    });

    // ---- Modal Close ----
    closeModal.addEventListener('click', () => (successModal.style.display = 'none'));
    window.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.style.display = 'none';
    });
  }

  // Smooth scrolling for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && !href.startsWith('#!')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Highlight current nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    link.classList.toggle('active', linkHref === currentPage);
  });
});

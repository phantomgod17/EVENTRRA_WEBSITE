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

  /* Keep rest of your existing JS code exactly the same */
});


// Mobile Navigation Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger) {
                hamburger.addEventListener('click', function() {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });
            }
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (hamburger) hamburger.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('active');
                });
            });
            
            // Calendar Functionality
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
                
                // Predefined booked dates for demonstration
                const bookedDates = [
                    '2023-06-15',
                    '2023-06-20',
                    '2023-06-25',
                    '2023-07-05',
                    '2023-07-12',
                    '2023-07-18'
                ];
                
                function renderCalendar(month, year) {
                    // Clear previous calendar
                    calendar.innerHTML = '';
                    
                    // Set current month and year
                    currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
                    
                    // Get first day of month and number of days in month
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    
                    // Create day headers
                    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    daysOfWeek.forEach(day => {
                        const dayElement = document.createElement('div');
                        dayElement.classList.add('calendar-day');
                        dayElement.textContent = day;
                        calendar.appendChild(dayElement);
                    });
                    
                    // Add empty cells for days before the first day of the month
                    for (let i = 0; i < firstDay; i++) {
                        const emptyCell = document.createElement('div');
                        calendar.appendChild(emptyCell);
                    }
                    
                    // Add days of the month
                    const today = new Date();
                    for (let day = 1; day <= daysInMonth; day++) {
                        const dateElement = document.createElement('div');
                        dateElement.classList.add('calendar-date');
                        dateElement.textContent = day;
                        
                        // Check if this date is today
                        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                            dateElement.classList.add('today');
                        }
                        
                        // Check if this date is booked
                        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        if (bookedDates.includes(dateString)) {
                            dateElement.classList.add('booked');
                        } else {
                            dateElement.classList.add('available');
                            
                            // Add click event to select date
                            dateElement.addEventListener('click', function() {
                                // Remove selected class from all dates
                                document.querySelectorAll('.calendar-date').forEach(date => {
                                    date.classList.remove('selected');
                                });
                                
                                // Add selected class to clicked date
                                this.classList.add('selected');
                                
                                // Store selected date
                                selectedDate = new Date(year, month, day);
                                
                                // Show selected date and booking form
                                selectedDateText.textContent = selectedDate.toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                });
                                selectedDateElement.style.display = 'block';
                                bookingForm.style.display = 'block';
                                
                                // Scroll to booking form
                                bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            });
                        }
                        
                        calendar.appendChild(dateElement);
                    }
                }
                
                // Initialize calendar
                renderCalendar(currentMonth, currentYear);
                
                // Previous month button
                prevMonthButton.addEventListener('click', function() {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    renderCalendar(currentMonth, currentYear);
                    
                    // Hide booking form when changing months
                    selectedDateElement.style.display = 'none';
                    bookingForm.style.display = 'none';
                    selectedDate = null;
                });
                
                // Next month button
                nextMonthButton.addEventListener('click', function() {
                    currentMonth++;
                    if (currentMonth > 11) {
                        currentMonth = 0;
                        currentYear++;
                    }
                    renderCalendar(currentMonth, currentYear);
                    
                    // Hide booking form when changing months
                    selectedDateElement.style.display = 'none';
                    bookingForm.style.display = 'none';
                    selectedDate = null;
                });
                
                // Submit booking form
                if (submitBooking) {
                    submitBooking.addEventListener('click', function() {
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const phone = document.getElementById('phone').value;
                        const eventType = document.getElementById('event-type').value;
                        const message = document.getElementById('message').value;
                        
                        // Basic validation
                        if (!name || !email || !phone || !eventType) {
                            alert('Please fill in all required fields: Name, Email, Phone, and Event Type.');
                            return;
                        }
                        
                        // In a real application, you would send this data to a server
                        console.log('Booking Request:', {
                            date: selectedDate,
                            name,
                            email,
                            phone,
                            eventType,
                            message
                        });
                        
                        // Show success modal
                        successModal.style.display = 'flex';
                        
                        // Reset form
                        document.getElementById('name').value = '';
                        document.getElementById('email').value = '';
                        document.getElementById('phone').value = '';
                        document.getElementById('event-type').value = '';
                        document.getElementById('message').value = '';
                        
                        // Hide booking form
                        selectedDateElement.style.display = 'none';
                        bookingForm.style.display = 'none';
                        
                        // Remove selected date
                        document.querySelectorAll('.calendar-date').forEach(date => {
                            date.classList.remove('selected');
                        });
                        
                        selectedDate = null;
                    });
                }
                
                // Close modal
                if (closeModal) {
                    closeModal.addEventListener('click', function() {
                        successModal.style.display = 'none';
                    });
                }
                
                // Close modal when clicking outside
                window.addEventListener('click', function(event) {
                    if (event.target === successModal) {
                        successModal.style.display = 'none';
                    }
                });
            }
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Only prevent default for same-page anchors
                    if (href !== '#' && !href.startsWith('#!')) {
                        e.preventDefault();
                        
                        const targetId = href;
                        if (targetId === '#') return;
                        
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
            
            // Set active navigation link based on current page
            function setActiveNavLink() {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const navLinks = document.querySelectorAll('.nav-link');
                
                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    if ((currentPage === 'index.html' && linkHref === 'index.html') ||
                        (currentPage !== 'index.html' && linkHref === currentPage)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
            
            setActiveNavLink();
        });

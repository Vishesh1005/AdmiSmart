// Video Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Remove loading animation when video loads
    const videoFrame = document.getElementById('youtube-video');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    videoFrame.addEventListener('load', function() {
        videoWrapper.style.setProperty('--loading', 'none');
    });
    
    // Handle video loading
    setTimeout(() => {
        const afterElement = videoWrapper.querySelector('::after');
        if (afterElement) {
            afterElement.style.display = 'none';
        }
    }, 2000);
    
    // Smooth scroll behavior for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to navigation elements
    const backBtn = document.querySelector('.back-btn');
    const logo = document.querySelector('.logo a');
    
    // Back button hover effect
    backBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    backBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Logo hover effect
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Option to go back to home on escape key
            if (confirm('Would you like to go back to the home page?')) {
                window.location.href = 'index.html';
            }
        }
    });
    
    // Handle window resize for responsive video
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate video dimensions if needed
            const videoWrapper = document.querySelector('.video-wrapper');
            if (videoWrapper) {
                // Force recalculation of aspect ratio
                videoWrapper.style.height = 'auto';
            }
        }, 250);
    });
    
    // Page visibility API to handle video when tab is not active
    document.addEventListener('visibilitychange', function() {
        const iframe = document.getElementById('youtube-video');
        if (document.hidden) {
            // Page is hidden, could pause video if needed
            console.log('Page is hidden');
        } else {
            // Page is visible
            console.log('Page is visible');
        }
    });
    
    // Add subtle animation when page loads
    const videoContainer = document.querySelector('.video-container');
    videoContainer.style.opacity = '0';
    videoContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        videoContainer.style.transition = 'all 0.8s ease';
        videoContainer.style.opacity = '1';
        videoContainer.style.transform = 'translateY(0)';
    }, 300);
    
    // Function to change video (if needed later)
    function changeVideo(videoId) {
        const iframe = document.getElementById('youtube-video');
        const newSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;
        iframe.src = newSrc;
    }
    
    // Make function available globally
    window.changeVideo = changeVideo;
    
    // Console log for debugging
    console.log('AdmiSmart Video Page Loaded Successfully');
});
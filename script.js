/**
 * TOP SECRET // CYBER INTELLIGENCE // NOFORN
 * CLASSIFIED JAVASCRIPT
 * 
 * Minimal, realistic effects for intelligence dossier presentation
 */

(function() {
    'use strict';

    // Set current date on cover page
    function setCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
        }
    }

    // Typewriter effect for main titles
    function typewriterEffect(element, text, speed = 50) {
        if (!element || !text) return;
        
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typewriter effects on page load
    function initTypewriterEffects() {
        // Agency name
        const agencyName = document.querySelector('.agency-name');
        if (agencyName) {
            const originalText = agencyName.textContent;
            setTimeout(() => {
                typewriterEffect(agencyName, originalText, 80);
            }, 500);
        }

        // Directorate
        const directorate = document.querySelector('.directorate');
        if (directorate) {
            const originalText = directorate.textContent;
            setTimeout(() => {
                typewriterEffect(directorate, originalText, 60);
            }, 2000);
        }

        // Document type
        const documentType = document.querySelector('.document-type');
        if (documentType) {
            const originalText = documentType.textContent;
            setTimeout(() => {
                typewriterEffect(documentType, originalText, 70);
            }, 3500);
        }
    }

    // Redaction hover reveal functionality
    function initRedactionReveals() {
        const redactedElements = document.querySelectorAll('.redacted-inline[data-reveal]');
        
        redactedElements.forEach(element => {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'redaction-tooltip';
            tooltip.textContent = element.getAttribute('data-reveal');
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #fff;
                color: #000;
                padding: 8px 12px;
                border: 2px solid #000;
                white-space: nowrap;
                z-index: 1000;
                font-family: 'Times New Roman', serif;
                font-size: 12px;
                letter-spacing: normal;
                box-shadow: 3px 3px 6px rgba(0,0,0,0.4);
                margin-bottom: 8px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            
            // Make parent relative for positioning
            element.style.position = 'relative';
            element.appendChild(tooltip);
            
            // Show on hover
            element.addEventListener('mouseenter', function() {
                tooltip.style.opacity = '1';
            });
            
            // Hide on leave
            element.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
            });
        });
    }

    // Slow fade-in for sections (enhanced)
    function initFadeInSections() {
        const sections = document.querySelectorAll('.document-section');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Add subtle scan line effect (optional, minimal)
    function addScanLineEffect() {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        scanLine.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(0,0,0,0.1);
            z-index: 9999;
            pointer-events: none;
            animation: scanMove 8s linear infinite;
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scanMove {
                0% {
                    top: 0;
                    opacity: 0.1;
                }
                50% {
                    opacity: 0.15;
                }
                100% {
                    top: 100vh;
                    opacity: 0.1;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(scanLine);
    }

    // Add random paper imperfections
    function addPaperImperfections() {
        const sections = document.querySelectorAll('.document-section');
        
        sections.forEach((section, index) => {
            // Random slight rotation
            const rotation = (Math.random() - 0.5) * 0.3;
            section.style.transform = `rotate(${rotation}deg)`;
            
            // Random slight offset
            const offsetX = (Math.random() - 0.5) * 4;
            const offsetY = (Math.random() - 0.5) * 4;
            section.style.marginLeft = `${offsetX}px`;
            section.style.marginTop = `${offsetY}px`;
        });
    }

    // Initialize all effects when DOM is ready
    function init() {
        setCurrentDate();
        initTypewriterEffects();
        initRedactionReveals();
        initFadeInSections();
        
        // Optional effects (can be disabled for performance)
        // addScanLineEffect();
        // addPaperImperfections();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add subtle page load effect
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });

})();


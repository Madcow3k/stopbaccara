// shared.js — Single source of truth for stopbaccara.com shared elements
// Edit this file once; all pages update automatically.

(function () {
    'use strict';

    // =========================================================================
    // CONFIG — Update these when things change
    // =========================================================================

    var LAST_UPDATED = 'April 17, 2026';

    var BANNER_HTML =
        '&#x1F6A8; <strong>Board of Supervisors Vote: Wednesday, May 6</strong> | ' +
        'The P&amp;Z Commission approved Baccara 7-0 on April 9. ' +
        'The Board of Supervisors holds final authority and will hear this case on May 6, 2026. ' +
        '<a href="index.html#news">What happened and what comes next</a>';

    var KEY_DATES_HTML =
        '<span style="color: var(--red-danger);">Feb 4, 2026:</span> ACC approved CEC 5-0<br><br>' +
        '<span style="color: var(--red-danger);">April 7, 2026:</span> Air quality hearing completed<br><br>' +
        '<span style="color: var(--red-danger);">April 9, 2026:</span> P&amp;Z Commission approved 7-0<br><br>' +
        '<span style="color: var(--success-green);">&#x2705; HB 2452:</span> Defeated. County retains full zoning authority.<br><br>' +
        '<span style="color: var(--orange-warning);">&#x1F6A8; May 6, 2026:</span> Board of Supervisors vote (FINAL)<br><br>' +
        '<span style="color: var(--orange-warning);">Q3 2026:</span> Takanock construction target';

    var FOOTER_TAGLINE = 'The ACC approved the environmental certificate. The P&amp;Z Commission recommended approval. The Board of Supervisors makes the final decision on May 6. Keep fighting.';

    // =========================================================================
    // NAV — Main section links + research pages
    // =========================================================================

    var MAIN_NAV_SECTIONS = [
        { label: 'Breaking News', hash: '#news' },
        { label: 'Research', hash: '#research' },
        { label: 'The Facts', hash: '#facts' },
        { label: 'Why It Matters', hash: '#concerns' },
        { label: 'Approval Status', hash: '#status' },
        { label: 'Take Action', hash: '#action' },
        { label: 'Talking Points', hash: '#talking' },
        { label: 'Contact Officials', hash: '#contact' },
        { label: 'Get Updates', hash: '#notify' },
        { label: 'Sources', hash: '#sources' }
    ];

    var RESEARCH_PAGES = [
        { label: 'What You Need to Know &#x2605;', file: 'what-you-need-to-know.html' },
        { label: 'Fact Check &#x2605;', file: 'in-their-words.html' },
        { label: 'Permit Analysis &#x2605;', file: 'permit-analysis.html' },
        { label: 'Business Model &#x2605;', file: 'prime-power-until.html' },
        { label: 'Noise &#x2605;', file: 'noise.html' },
        { label: 'Heat &amp; Bills &#x2605;', file: 'heat.html' }
    ];

    // Quick links shown in the footer
    var FOOTER_QUICK_LINKS = [
        { label: 'Breaking News', href: 'index.html#news' },
        { label: 'The Facts', href: 'index.html#facts' },
        { label: 'Why It Matters', href: 'index.html#concerns' },
        { label: 'Take Action', href: 'index.html#action' },
        { label: 'Talking Points', href: 'index.html#talking' },
        { label: 'Contact Officials', href: 'index.html#contact' },
        { label: 'Get Updates', href: 'index.html#notify' },
        { label: '&#x2605; What You Need to Know', href: 'what-you-need-to-know.html', highlight: true },
        { label: '&#x2605; Fact Check: In Their Own Words', href: 'in-their-words.html', highlight: true },
        { label: '&#x2605; Permit Analysis', href: 'permit-analysis.html', highlight: true },
        { label: '&#x2605; Prime Power Until: Business Model', href: 'prime-power-until.html', highlight: true },
        { label: '&#x2605; Noise: Eighteen Turbines, No Study', href: 'noise.html', highlight: true },
        { label: '&#x2605; Heat, Bills, and What Has Not Been Studied', href: 'heat.html', highlight: true }
    ];


    // =========================================================================
    // HELPERS
    // =========================================================================

    function currentPage() {
        var path = window.location.pathname;
        var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return file;
    }

    function isIndex() {
        var page = currentPage();
        return page === 'index.html' || page === '' || page === '/';
    }


    // =========================================================================
    // INJECT BANNER CSS (for pages that don't have it in their stylesheet)
    // =========================================================================

    function injectBannerCSS() {
        if (document.querySelector('.alert-banner')) return; // CSS already present if element exists
        var style = document.createElement('style');
        style.textContent =
            '.alert-banner {' +
            '  background: linear-gradient(90deg, var(--red-danger, #c41e3a), var(--orange-warning, #e85d04));' +
            '  color: white;' +
            '  padding: 12px 20px;' +
            '  text-align: center;' +
            '  font-size: 0.95rem;' +
            '  font-weight: 600;' +
            '  position: sticky;' +
            '  top: 0;' +
            '  z-index: 1000;' +
            '}' +
            '.alert-banner a { color: white; text-decoration: underline; }';
        document.head.appendChild(style);
    }


    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    function renderBanner() {
        var el = document.getElementById('shared-banner');
        if (!el) return;
        injectBannerCSS();
        el.className = 'alert-banner';
        // On index.html, use hash-only link
        var html = BANNER_HTML;
        if (isIndex()) {
            html = html.replace('index.html#news', '#news');
        }
        el.innerHTML = html;
    }

    function renderNav() {
        var el = document.getElementById('shared-nav');
        if (!el) return;

        var page = currentPage();
        var prefix = isIndex() ? '' : 'index.html';
        var items = '';

        // Main section links
        for (var i = 0; i < MAIN_NAV_SECTIONS.length; i++) {
            var s = MAIN_NAV_SECTIONS[i];
            items += '<li><a href="' + prefix + s.hash + '">' + s.label + '</a></li>';
        }

        // Research page links
        for (var j = 0; j < RESEARCH_PAGES.length; j++) {
            var r = RESEARCH_PAGES[j];
            var style = ' style="color: var(--orange-warning);"';
            // If we're on this page, don't make it a link
            if (r.file === page) {
                items += '<li><span style="color: var(--orange-warning); font-weight: 700; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.5px;">' + r.label + '</span></li>';
            } else {
                items += '<li><a href="' + r.file + '"' + style + '>' + r.label + '</a></li>';
            }
        }

        el.innerHTML = '<ul>' + items + '</ul>';
    }

    function renderFooter() {
        var el = document.getElementById('shared-footer');
        if (!el) return;

        // Quick Links
        var quickLinksHtml = '<div class="footer-section"><h4>Quick Links</h4>';
        for (var i = 0; i < FOOTER_QUICK_LINKS.length; i++) {
            var link = FOOTER_QUICK_LINKS[i];
            var linkStyle = link.highlight ? ' style="color: var(--orange-warning);"' : '';
            quickLinksHtml += '<a href="' + link.href + '"' + linkStyle + ' target="' + (link.href.indexOf('#') !== -1 ? '_self' : '_self') + '">' + link.label + '</a>';
        }
        quickLinksHtml += '</div>';

        // Key Dates
        var keyDatesHtml =
            '<div class="footer-section">' +
            '<h4>Key Dates</h4>' +
            '<p style="color: var(--text-secondary); font-size: 0.9rem;">' +
            KEY_DATES_HTML +
            '</p></div>';

        // Share and Connect
        var shareHtml =
            '<div class="footer-section">' +
            '<h4>Share and Connect</h4>' +
            '<p style="color: var(--text-secondary); font-size: 0.9rem;">' +
            'Hashtag: <strong>#StopBaccara</strong><br><br>' +
            'Share on Nextdoor, Facebook, and community groups<br><br>' +
            '<a href="https://www.facebook.com/groups/projectbaccaraopposition" target="_blank">Join the Opposition Group</a>' +
            '</p></div>';

        // Coalition cross-link
        var coalitionHtml =
            '<div class="footer-section">' +
            '<h4>Also from the Surprise Community Coalition</h4>' +
            '<p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.75rem;">Two threats. One community. We are fighting both.</p>' +
            '<a href="https://noiceinsurprise.com" target="_blank" ' +
            'style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.25); border-radius: 6px; padding: 0.65rem 1rem; color: white; font-weight: 700; font-size: 0.9rem; text-decoration: none;" ' +
            'onmouseover="this.style.background=\'rgba(255,255,255,0.16)\'" ' +
            'onmouseout="this.style.background=\'rgba(255,255,255,0.08)\'">' +
            '&#x1F6D1; Stop the ICE Detention Facility<br>' +
            '<span style="font-weight: 400; font-size: 0.8rem; opacity: 0.8;">noiceinsurprise.com</span>' +
            '</a></div>';

        // Assemble footer
        el.innerHTML =
            '<div class="footer-content">' +
            quickLinksHtml + keyDatesHtml + shareHtml + coalitionHtml +
            '</div>' +
            '<div class="footer-bottom">' +
            '<p>Created by concerned West Valley residents. Last updated: ' + LAST_UPDATED + '</p>' +
            '<p style="margin-top: 10px;"><strong>' + FOOTER_TAGLINE + '</strong></p>' +
            '</div>';
    }

    // Minimal footer for in-their-words (different layout)
    function renderMinimalFooter() {
        var el = document.getElementById('shared-footer-minimal');
        if (!el) return;

        el.innerHTML =
            '<div class="footer-links">' +
            '<a href="index.html">Stop Baccara Home</a>' +
            '<a href="https://noiceinsurprise.com" target="_blank">No ICE in Surprise</a>' +
            '<a href="index.html#sources">All Sources</a>' +
            '<a href="permit-analysis.html">Permit Analysis</a>' +
            '<a href="noise.html">Noise</a>' +
            '<a href="heat.html">Heat &amp; Bills</a>' +
            '</div>' +
            '<p class="footer-credit">Created by the Surprise Community Coalition. Last updated: ' + LAST_UPDATED + '</p>';
    }

    // =========================================================================
    // INIT
    // =========================================================================

    document.addEventListener('DOMContentLoaded', function () {
        renderBanner();
        renderNav();
        renderFooter();
        renderMinimalFooter();
    });

})();

import React, { useEffect, useState, useRef } from 'react';
import {adminAPI } from '../../config/api';

function AdverstandingSection({ openOnLoginOnly = false }) {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSkip, setShowSkip] = useState(false);
    const skipTimerRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        fetchActiveAds();
    }, []);

    useEffect(() => {
        // When ads are loaded, open modal if there are any.
        // If openOnLoginOnly is true, wait for either a sessionStorage flag
        // 'showAdOnLogin' or for a custom window event 'ricr:login' to be dispatched.
        if (!ads || !ads.length) return;

        if (openOnLoginOnly) {
            const checkAndOpen = () => {
                const flag = sessionStorage.getItem('showAdOnLogin');
                // only auto-open when on the Home route
                if (flag === 'true' && window.location && window.location.pathname === '/') {
                    // keep the flag so refreshing the Home page will reopen the modal
                    setCurrentIndex(0);
                    setShowModal(true);
                }
            };

            // immediate check (in case login flow set the flag before redirect)
            checkAndOpen();

            // listen for custom event (login flow can dispatch this after successful login)
            const handler = () => {
                // set the flag so the modal will continue to appear on Home refresh
                try { sessionStorage.setItem('showAdOnLogin', 'true'); } catch (e) {}
                if (window.location && window.location.pathname === '/') {
                    setCurrentIndex(0);
                    setShowModal(true);
                }
            };
            window.addEventListener('ricr:login', handler);

            return () => window.removeEventListener('ricr:login', handler);
        }

        // default behavior: open modal immediately when ads exist
        setCurrentIndex(0);
        setShowModal(true);
    }, [ads, openOnLoginOnly]);

    useEffect(() => {
        // reset skip timer when modal opens or current ad changes
        clearSkipTimer();
        setShowSkip(false);

        if (!showModal) return;

        // start a 5s timer to show the Skip button
        skipTimerRef.current = setTimeout(() => {
            setShowSkip(true);
        }, 5000);

        return () => {
            clearSkipTimer();
        };
    }, [showModal, currentIndex]);

    const clearSkipTimer = () => {
        if (skipTimerRef.current) {
            clearTimeout(skipTimerRef.current);
            skipTimerRef.current = null;
        }
    };

    const fetchActiveAds = async () => {
        setLoading(true);
        try {
            const res = await adminAPI.getAllAdvertising();
            const active = (res.data || []).filter(a => a.status === 'active');
            setAds(active);
        } catch (err) {
            setAds([]);
        } finally {
            setLoading(false);
        }
    };

    const closeModalOrAdvance = () => {
        clearSkipTimer();
        // advance to next ad if any
        if (currentIndex + 1 < ads.length) {
            setCurrentIndex(i => i + 1);
            setShowSkip(false);
        } else {
            setShowModal(false);
        }
    };

    const handleVideoEnded = () => {
        closeModalOrAdvance();
    };

    // don't render anything on the page itself; only show the modal when ads are available
    if (loading) return null;
    if (!ads.length) return null;

    const currentAd = ads[currentIndex];

    return (
        <>
            {/* Only render the modal when ads are available and showModal is true */}
            {showModal && currentAd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="relative z-10 max-w-3xl w-full mx-4">
                        <div className="bg-white rounded shadow-lg overflow-hidden">
                            <div className="relative">
                                {currentAd.medial === 'video' ? (
                                    <video
                                        ref={videoRef}
                                        src={currentAd.url}
                                        className="w-full max-h-[70vh] object-contain bg-black"
                                        onEnded={handleVideoEnded}
                                        autoPlay
                                        muted
                                        controls
                                    />
                                ) : (
                                    <img src={currentAd.url} alt="ad" className="w-full max-h-[70vh] object-contain" />
                                )}

                                {/* Skip button shown after 5s */}
                                {showSkip && (
                                    <button
                                        onClick={closeModalOrAdvance}
                                        className="absolute right-3 top-3 bg-black/60 text-white px-3 py-1 rounded-md hover:bg-black"
                                    >
                                        Skip
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdverstandingSection;
import React, { useState } from 'react';

const FaqMain = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "Do I need a piano or keyboard to take these lessons?",
            answer: "Yes, you'll need access to either a piano or keyboard. A full 88-key keyboard is ideal, but you can start with a 61-key keyboard. We recommend weighted keys if possible, as they provide a more authentic playing experience similar to an acoustic piano."
        },
        {
            question: "I'm a complete beginner. Can I still learn gospel piano?",
            answer: "Absolutely! Our beginner lessons start from the very basics, teaching you proper hand positioning, basic chords, and simple progressions. Gospel piano is actually a great style to learn as a beginner because it focuses on practical chord patterns and techniques you can use immediately in worship settings."
        },
        {
            question: "How long does it take to learn gospel piano?",
            answer: "This varies depending on your practice routine and musical background. With consistent practice (30-60 minutes daily), most beginners can play simple gospel songs within 2-3 months. Intermediate skills typically develop within 6-12 months. However, gospel piano is a lifelong journey of continuous improvement!"
        },
        {
            question: "What makes gospel piano different from classical piano?",
            answer: "Gospel piano emphasizes chord-based playing, improvisation, and feel over strict note-reading. It focuses on progressions, runs, fills, and creating a full sound with both hands. While classical piano follows written sheet music precisely, gospel piano encourages creativity and personal expression within chord structures."
        },
        {
            question: "Do I need to read sheet music to play gospel piano?",
            answer: "Not necessarily! While basic music reading is helpful, gospel piano primarily uses chord charts and lead sheets. We teach you to play by understanding chord progressions and patterns rather than reading every single note. This approach actually helps you learn faster and play more creatively."
        },
        {
            question: "What topics are covered in the lessons?",
            answer: "Our lessons cover everything from basic major and minor chords to advanced topics like: chord inversions, 7th chords, 9th chords and extensions, gospel progressions (2-5-1, 6-2-5-1), runs and fills, left-hand bass patterns, right-hand melodies and embellishments, playing by ear, and improvisation techniques."
        },
        {
            question: "Can I access the lessons on my phone or tablet?",
            answer: "Yes! Our platform is fully responsive and works on all devices - desktop computers, laptops, tablets, and smartphones. You can practice anywhere, anytime. However, we recommend using a larger screen when possible for the best viewing experience of the video lessons."
        },
        {
            question: "How long do I have access to the lessons?",
            answer: "Once you enroll in a lesson, you have lifetime access! There's no time limit. You can learn at your own pace, revisit lessons as many times as needed, and access all course materials forever. We also regularly update content with new techniques and songs."
        },
        {
            question: "What if I get stuck or have questions?",
            answer: "We're here to help! Each lesson includes detailed video instruction and practice materials. You can also reach out through our contact page with specific questions. Many students find it helpful to practice slowly, break difficult sections into smaller parts, and don't hesitate to replay lessons multiple times."
        },
        {
            question: "Can I learn to play for my church worship team?",
            answer: "Absolutely! That's one of the main goals of our program. We teach practical skills specifically designed for church worship settings, including how to follow a worship leader, play in different keys, create dynamic arrangements, and support congregational singing. Many of our students actively serve on their church worship teams."
        },
        {
            question: "Do you offer refunds?",
            answer: "Yes, we want you to be completely satisfied. If you're not happy with a lesson within the first 30 days of purchase, contact us for a full refund. We're confident in the quality of our instruction and want to ensure every student has a positive learning experience."
        },
        {
            question: "What's the difference between beginner, intermediate, and advanced lessons?",
            answer: "Beginner lessons cover basic chords, simple progressions, and foundational techniques. Intermediate lessons introduce 7th chords, more complex progressions, basic runs, and improvisation. Advanced lessons focus on sophisticated voicings, extended chords, advanced runs and fills, reharmonization, and professional-level arranging techniques."
        }
    ];

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="react-wrapper">
            <div className="react-wrapper-inner">
                {/* Page Header */}
                <div style={{
                    padding: '80px 0 60px',
                    backgroundColor: '#f8f9fa',
                    textAlign: 'center',
                    borderBottom: '1px solid #dee2e6'
                }}>
                    <div className="container">
                        <h1 style={{
                            fontSize: '48px',
                            fontWeight: '700',
                            marginBottom: '20px',
                            color: '#212529'
                        }}>
                            Frequently Asked Questions
                        </h1>
                        <p style={{
                            fontSize: '18px',
                            color: '#6c757d',
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            Find answers to common questions about learning gospel piano with Gospel Keys Demystified
                        </p>
                    </div>
                </div>

                {/* FAQ Content */}
                <div style={{ padding: '80px 0', backgroundColor: 'white' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                {faqData.map((faq, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            marginBottom: '20px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            backgroundColor: 'white',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            style={{
                                                width: '100%',
                                                padding: '20px 25px',
                                                backgroundColor: activeIndex === index ? '#f8f9fa' : 'white',
                                                border: 'none',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                color: '#212529',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <span>{faq.question}</span>
                                            <span style={{
                                                fontSize: '24px',
                                                color: '#0d6efd',
                                                transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease',
                                                marginLeft: '15px'
                                            }}>
                                                +
                                            </span>
                                        </button>
                                        {activeIndex === index && (
                                            <div style={{
                                                padding: '20px 25px',
                                                backgroundColor: '#f8f9fa',
                                                borderTop: '1px solid #dee2e6',
                                                animation: 'slideDown 0.3s ease'
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '16px',
                                                    lineHeight: '1.8',
                                                    color: '#495057'
                                                }}>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="row justify-content-center" style={{ marginTop: '60px' }}>
                            <div className="col-lg-8">
                                <div style={{
                                    padding: '40px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    border: '2px solid #0d6efd'
                                }}>
                                    <h3 style={{
                                        fontSize: '28px',
                                        fontWeight: '700',
                                        marginBottom: '15px',
                                        color: '#212529'
                                    }}>
                                        Still Have Questions?
                                    </h3>
                                    <p style={{
                                        fontSize: '16px',
                                        color: '#6c757d',
                                        marginBottom: '25px'
                                    }}>
                                        Can't find the answer you're looking for? We're here to help!
                                    </p>
                                    <a
                                        href="/contact"
                                        style={{
                                            display: 'inline-block',
                                            padding: '12px 30px',
                                            backgroundColor: '#0d6efd',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '6px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0b5ed7'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#0d6efd'}
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqMain;

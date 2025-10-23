import { useState } from 'react';

const CourseUploadForm = () => {
    const [formData, setFormData] = useState({
        name: 'Gospel Piano',
        title: '',
        author: '',
        authorImg: 'author.png',
        lesson: '',
        enrolled: '0',
        price: '',
        regularPrice: '',
        duration: '',
        type: 'Beginner',
        language: 'English',
        review: '5.0',
        image: '1.png',
        bannerImg: 'course-banner1.jpg'
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        // Validation
        if (!formData.title || !formData.author || !formData.price) {
            setError('Please fill in all required fields');
            return;
        }

        // Get existing courses
        const courses = JSON.parse(localStorage.getItem('pianoCourses') || '[]');

        // Create new course
        const newCourse = {
            id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
            ...formData,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        courses.push(newCourse);
        localStorage.setItem('pianoCourses', JSON.stringify(courses));

        setSuccess('Gospel piano lesson uploaded successfully!');

        // Reset form
        setFormData({
            name: 'Gospel Piano',
            title: '',
            author: '',
            authorImg: 'author.png',
            lesson: '',
            enrolled: '0',
            price: '',
            regularPrice: '',
            duration: '',
            type: 'Beginner',
            language: 'English',
            review: '5.0',
            image: '1.png',
            bannerImg: 'course-banner1.jpg'
        });

        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="login-right-form">
            <div className="login-top" style={{ marginBottom: '30px' }}>
                <h3>Upload New Gospel Piano Lesson</h3>
                <p>Fill in the details to add a new lesson to Gospel Keys Demystified</p>
            </div>

            {success && (
                <div style={{
                    padding: '15px',
                    marginBottom: '20px',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    borderRadius: '4px',
                    border: '1px solid #c3e6cb'
                }}>
                    {success}
                </div>
            )}

            {error && (
                <div style={{
                    padding: '15px',
                    marginBottom: '20px',
                    backgroundColor: '#fee',
                    color: '#c33',
                    borderRadius: '4px',
                    border: '1px solid #fcc'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <label>Lesson Title *</label>
                            <input
                                placeholder="e.g., Gospel Chord Progressions for Beginners"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            <label>Instructor Name *</label>
                            <input
                                placeholder="e.g., John Smith"
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <p>
                            <label>Number of Lessons</label>
                            <input
                                placeholder="e.g., 12"
                                type="number"
                                name="lesson"
                                value={formData.lesson}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="col-md-4">
                        <p>
                            <label>Duration</label>
                            <input
                                placeholder="e.g., 6 Weeks"
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="col-md-4">
                        <p>
                            <label>Difficulty Level</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <label>Price *</label>
                            <input
                                placeholder="e.g., $99.00"
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            <label>Regular Price (optional)</label>
                            <input
                                placeholder="e.g., $149.00"
                                type="text"
                                name="regularPrice"
                                value={formData.regularPrice}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <label>Course Image Filename</label>
                            <input
                                placeholder="e.g., piano-course-1.png"
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                            />
                            <small style={{ color: '#666', fontSize: '12px' }}>
                                Upload image to src/assets/images/course/ first
                            </small>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            <label>Banner Image Filename</label>
                            <input
                                placeholder="e.g., course-banner1.jpg"
                                type="text"
                                name="bannerImg"
                                value={formData.bannerImg}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <label>Language</label>
                            <input
                                placeholder="e.g., English"
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            <label>Initial Review Score</label>
                            <input
                                placeholder="e.g., 5.0"
                                type="text"
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '15px',
                        backgroundColor: '#1D3FAD',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Upload Gospel Piano Lesson
                </button>
            </form>
        </div>
    );
};

export default CourseUploadForm;

import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import api from "../../services/Api";

function CreateNewCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");

  const [courseCode, setCourseCode] = useState("");
  const [courseCodeError, setCourseCodeError] = useState("");

  const editorRef = useRef(null);
  const [editorError, setEditorError] = useState("");

  const [courseCardPhoto, setCourseCardPhoto] = useState(null);
  const [courseCardPhotoError, setCourseCardPhotoError] = useState("");

  const handleCourseCardPhoto = async (e) => {
    setCourseCardPhoto(e.target.files[0]);
  };

  const [courseCoverPhoto, setCourseCoverPhoto] = useState(null);
  const [courseCoverPhotoError, setCourseCoverPhotoError] = useState("");

  const handleCourseCoverPhoto = async (e) => {
    setCourseCoverPhoto(e.target.files[0]);
  };

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [status, setStatus] = useState("active");
  const [statusError, setStatusError] = useState("");

  const [instructorName1, setInstructorName1] = useState("");
  const [instructorProfession1, setInstructorProfession1] = useState("");
  const [instructorLinkedin1, setInstructorLinkedin1] = useState("");
  const [instructorPhoto1, setInstructorPhoto1] = useState(null);

  const handleInstructorPhoto1 = async (e) => {
    setInstructorPhoto1(e.target.files[0]);
  };

  const [instructorName2, setInstructorName2] = useState("");
  const [instructorProfession2, setInstructorProfession2] = useState("");
  const [instructorLinkedin2, setInstructorLinkedin2] = useState("");
  const [instructorPhoto2, setInstructorPhoto2] = useState(null);

  const handleInstructorPhoto2 = async (e) => {
    setInstructorPhoto2(e.target.files[0]);
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState("0");

  const validateCourseName = () => {
    let result = false;
    if (courseName.trim().length < 3) {
      setCourseNameError("Please enter course name.");
    } else {
      setCourseNameError("");
      result = true;
    }
    return result;
  };

  const validateCourseCode = () => {
    let result = false;
    if (courseCode.trim().length < 3) {
      setCourseCodeError("Please enter course code. Length 4-10");
    } else {
      setCourseCodeError("");
      result = true;
    }
    return result;
  };

  const checkCourseUrlUniqueness = async () => {
    let result = false;
    try {
      if (courseCode.trim().length > 3) {
        const response = await api.get(
          "admin/courses/slug-check/" + courseCode
        );
        if (response?.data.isUnique === true) {
          setCourseCodeError("");
          result = true;
        } else {
          setCourseCodeError("The course code already taken!");
        }
      }
    } catch (error) {
      setCourseCodeError(error.message);
    }
    return result;
  };

  useEffect(() => {
    checkCourseUrlUniqueness();
  }, [courseCode]);

  const validateEditor = () => {
    let result = false;
    if (editorRef.current.getContent().trim().length < 3) {
      setEditorError("Please enter course details.");
    } else {
      setEditorError("");
      result = true;
    }
    return result;
  };

  const validateCourseCardPhoto = () => {
    let result = false;
    if (!courseCardPhoto) {
      setCourseCardPhotoError("Please select course card photo.");
    } else {
      setCourseCardPhotoError("");
      result = true;
    }
    return result;
  };

  const validateCourseCoverPhoto = () => {
    let result = false;
    if (!courseCoverPhoto) {
      setCourseCoverPhotoError("Please select course cover photo.");
    } else {
      setCourseCoverPhotoError("");
      result = true;
    }
    return result;
  };

  const validateDuration = () => {

    let isValidDuration = true;
    const MAX_COURSE_DURATION = 25;
    const MIN_COURSE_DURATION = 0;

    while ( true ) {

      if (  duration.trim().length === 0 ) {
        isValidDuration = false;
        setDurationError('Duration cannot be empty.');
        break;
      }

      if ( isNaN(duration) ) {
        isValidDuration = false;
        setDurationError('Duration must be digits only.')
        break;
      }

      if ( parseInt(duration) < MIN_COURSE_DURATION ) {
        isValidDuration = false;
        setDurationError(`Duration must be greater than ${MIN_COURSE_DURATION} month(s).`);
        break;
      } 
      
      if ( parseInt(duration) > MAX_COURSE_DURATION ) {
        isValidDuration = false;
        setDurationError(`Duration must be lesser than ${MAX_COURSE_DURATION} months.`);
        break;
      }

      if ( isValidDuration ) {
        setDurationError('');
      }

      break;
    }

    return isValidDuration;
  };

  const validatePrice = () => {
    const PRICE_UPPER_LIMIT = 100000;
    const PRICE_LOWER_LIMIT = 500;

    let isValidPrice = true;

    while ( true ) {
      if ( price.trim().length === 0 ) {
        isValidPrice = false;
        setPriceError('Price cannot be empty.');
        break;
      }

      if ( isNaN(price)) {
        isValidPrice = false;
        setPriceError('Price must be in digits only');
        break;
      }

      if ( parseInt(price) < PRICE_LOWER_LIMIT ) {
        isValidPrice = false;
        setPriceError(`Price must be more than ${PRICE_LOWER_LIMIT}`);
        break;
      }

      if ( parseInt(price) > PRICE_UPPER_LIMIT ) {
        isValidPrice = false;
        setPriceError(`Price must be less than ${PRICE_UPPER_LIMIT}`);
        break;
      }

      if ( isValidPrice ) {
        setPriceError('');
      }

      break;
    }
    return isValidPrice;
  };

  const validateStatus = () => {
    let result = false;
    if (
      !(status === "active" || status === "inactive" || status === "suspended")
    ) {
      setStatusError("Please select course status.");
    } else {
      setStatusError("");
      result = true;
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate the form
    let isValid =
      validateCourseName() &&
      (await checkCourseUrlUniqueness()) &&
      validateDuration() &&
      validatePrice() &&
      validateStatus() &&
      validateCourseCardPhoto() &&
      validateCourseCoverPhoto() &&
      validateEditor();

    if (isValid) {
      // If form valid then upload files and send save req
      try {
        const data = new FormData();

        data.append("card-photo", courseCardPhoto);
        data.append("cover-photo", courseCoverPhoto);
        data.append("ins-photo-1", instructorPhoto1);
        data.append("ins-photo-2", instructorPhoto2);

        data.append("name", courseName);
        data.append("slug", courseCode);
        data.append("description", editorRef?.current.getContent());
        data.append("price", price);
        data.append("duration", duration);
        data.append("status", status);
        data.append("instructorName1", instructorName1);
        data.append("socialMediaLink1", instructorLinkedin1);
        data.append("studyArea1", instructorProfession1);
        data.append("instructorName2", instructorName2);
        data.append("socialMediaLink2", instructorLinkedin2);
        data.append("studyArea2", instructorProfession2);

        const config = {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted + "%");
          },
        };

        const response = await api.post("admin/courses", data, config);

        if (response.status === 200) {
          setSuccess(response.data.name + " saved!");

          // TODO: clean the form values
          setError("");
          console.log(response);
        } else {
          setError("Something went wrong while saving the course!");
        }
      } catch (error) {
        alert(error);
        setError(error.message);
      }
    }
  };

  return (
    <div className={``}>
      <hr style={{ color: "transparent" }} />
      <Container fluid="lg">
        <Breadcrumb className="ms-4">
          <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin-dashboard">
            Admin Dashboard{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin-dashboard/course-management">
            Course Management{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create New Course</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <section className={`pb-5 mb-5 pt-4`}>
        <div className={`container pt-4  `}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          <form className={`row g-3 px-4 `} onSubmit={handleSubmit}>
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${
                    courseNameError.length > 0 ? "is-invalid" : ""
                  }`}
                  id="courseName"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}
                  onBlur={validateCourseName}
                  autoFocus
                  required
                />
                <label htmlFor="floatingInputFirstName">Course Name</label>
                <div className="invalid-feedback">{courseNameError}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${
                    courseCodeError.length > 0 ? "is-invalid" : ""
                  }`}
                  id="courseCode"
                  placeholder="Course Code Ex: CS-101"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  onBlur={validateCourseCode}
                  required
                  maxLength={10}
                  minLength={4}
                />
                <label htmlFor="courseCode">Course Code Ex: CS-101</label>
                <div className="invalid-feedback">{courseCodeError}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${
                    durationError.length > 0 ? "is-invalid" : ""
                  }`}
                  id="duration"
                  placeholder="Duration"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  onBlur={validateDuration}
                />
                <label htmlFor="duration">Duration</label>
                <div className="invalid-feedback">{durationError}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${
                    priceError.length > 0 ? "is-invalid" : ""
                  }`}
                  id="price"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={validatePrice}
                />
                <label htmlFor="price">Price</label>
                <div className="invalid-feedback">{priceError}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <select
                  id="status"
                  className={`form-control ${
                    statusError.length > 0 ? "is-invalid" : ""
                  }`}
                  aria-label="Course Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  
                  onBlur={validateStatus}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Suspended</option>
                  <option value="inactive">Inactive</option>
                </select>
                <label htmlFor="status">Status</label>
                <div className="invalid-feedback">{statusError}</div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="courseCardPhoto" className="form-label m-0">
                Course Card Photo
              </label>
              <input
                className={`form-control ${
                  courseCardPhotoError.length > 0 ? "is-invalid" : ""
                }`}
                type="file"
                id="courseCardPhoto"
                required
                onChange={handleCourseCardPhoto}
                onBlur={validateCourseCardPhoto}
              />
              <div className="invalid-feedback">{courseCardPhotoError}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="courseCoverPhoto" className="form-label m-0">
                Course Cover Photo
              </label>
              <input
                className={`form-control ${
                  courseCoverPhotoError.length > 0 ? "is-invalid" : ""
                }`}
                type="file"
                id="courseCoverPhoto"
                required
                onChange={handleCourseCoverPhoto}
                onBlur={validateCourseCoverPhoto}
              />
              <div className="invalid-feedback">{courseCoverPhotoError}</div>
            </div>
            <div className="col-md-12">
              <Editor
                apiKey="80okyiza0vwemmx5xwbxzf8e47ogn6t7r1gldhgs50yy4ecg"
                onInit={(evt, editor) => (editorRef.current = editor)}
                onBlur={validateEditor}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  placeholder: "Course Description",
                }}
              />
              <div className="invalid-feedback">{editorError}</div>
            </div>
            <div className="col-md-12 mt-4">
              <strong>Instructor Information 1</strong>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="instructorName1"
                  placeholder="Instructor Name (1)"
                  value={instructorName1}
                  onChange={(e) => setInstructorName1(e.target.value)}
                />
                <label htmlFor="instructorName1">Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="instructorProfession1"
                  placeholder="Instructor Profession"
                  value={instructorProfession1}
                  onChange={(e) => setInstructorProfession1(e.target.value)}
                />
                <label htmlFor="instructorProfession1">Profession</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="instructorLinkedin1"
                  placeholder="Instructor Linkedin"
                  value={instructorLinkedin1}
                  onChange={(e) => setInstructorLinkedin1(e.target.value)}
                />
                <label htmlFor="instructorLinkedin1">Linkedin URL</label>
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="instructorPhoto1" className="form-label m-0">
                Instructor Photo
              </label>
              <input
                className="form-control"
                type="file"
                id="instructorPhoto1"
                onChange={handleInstructorPhoto1}
              />
            </div>
            <div className="col-md-12 mt-4">
              <strong>Instructor Information 2</strong>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="instructorName2"
                  placeholder="Instructor Name"
                  value={instructorName2}
                  onChange={(e) => setInstructorName2(e.target.value)}
                />
                <label htmlFor="instructorName2">Instructor Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="instructorProfession2"
                  placeholder="Instructor Profession"
                  value={instructorProfession2}
                  onChange={(e) => setInstructorProfession2(e.target.value)}
                />
                <label htmlFor="instructorProfession2">Profession</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="instructorLinkedin2"
                  placeholder="Instructor Linkedin URL"
                  value={instructorLinkedin2}
                  onChange={(e) => setInstructorLinkedin2(e.target.value)}
                />
                <label htmlFor="instructorLinkedin2">
                  Instructor Linkedin URL
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="instructorPhoto2" className="form-label m-0">
                Instructor Photo
              </label>
              <input
                className="form-control"
                type="file"
                id="instructorPhoto2"
                onChange={handleInstructorPhoto2}
              />
            </div>
            <div className="col-md-12">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: uploadProgress }}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end">
              <button className="btn btn-lg btn-primary">Save</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreateNewCourse;

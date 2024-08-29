// src/components/SurveyTable.js
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  fetchSurveys,
  deleteSurvey,
  updateSurvey,
} from "../services/apiService";
import styles from "./SurveyTable.module.css";

const SurveyTable = () => {
  const [surveys, setSurveys] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedSurvey, setEditedSurvey] = useState({});

  useEffect(() => {
    const loadSurveys = async () => {
      const data = await fetchSurveys();
      setSurveys(data);
    };

    loadSurveys();
  }, []);

  const handleEditClick = (survey) => {
    setEditMode(survey._id);
    setEditedSurvey(survey);
  };

  const handleDeleteClick = async (id) => {
    await deleteSurvey(id);
    setSurveys(surveys.filter((survey) => survey._id !== id));
  };

  const handleInputChange = (name, value) => {
    setEditedSurvey({ ...editedSurvey, [name]: value });
  };

  const handleSaveClick = async () => {
    await updateSurvey(editMode, editedSurvey);
    setSurveys(
      surveys.map((survey) => (survey._id === editMode ? editedSurvey : survey))
    );
    setEditMode(null);
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Survey Responses</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Current Provider</th>
            <th>Usage</th>
            <th>Connection</th>
            <th>Speed</th>
            <th>Urgency</th>
            <th>Zip Code</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Call Back Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey._id}>
              {editMode === survey._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.provider}
                      onChange={(e) =>
                        handleInputChange("provider", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.currentProvider}
                      onChange={(e) =>
                        handleInputChange("currentProvider", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.usage}
                      onChange={(e) =>
                        handleInputChange("usage", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.connection}
                      onChange={(e) =>
                        handleInputChange("connection", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.speed}
                      onChange={(e) =>
                        handleInputChange("speed", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.urgency}
                      onChange={(e) =>
                        handleInputChange("urgency", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedSurvey.callBackTime}
                      onChange={(e) =>
                        handleInputChange("callBackTime", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={handleSaveClick}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Save
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => setEditMode(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{survey.provider}</td>
                  <td>{survey.currentProvider}</td>
                  <td>{survey.usage}</td>
                  <td>{survey.connection}</td>
                  <td>{survey.speed}</td>
                  <td>{survey.urgency}</td>
                  <td>{survey.zipCode}</td>
                  <td>{survey.email}</td>
                  <td>{survey.firstName}</td>
                  <td>{survey.lastName}</td>
                  <td>{survey.phone}</td>
                  <td>{survey.callBackTime}</td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditClick(survey)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDeleteClick(survey._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyTable;

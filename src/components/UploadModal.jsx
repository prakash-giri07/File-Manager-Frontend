import { useState } from "react";
import {
    Modal,
    Button,
    ProgressBar,
    ToggleButtonGroup,
    ToggleButton
} from "react-bootstrap";
import {
    FileEarmark,
    FileEarmarkPdf,
    FileEarmarkText,
    Grid,
    List
} from "react-bootstrap-icons";
import axios from "axios";

const API_URL = "http://localhost:5000/api/files/upload";

export default function UploadModal({ show, handleClose, onUploadSuccess }) {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(null);
    const [viewMode, setViewMode] = useState("list");

    const addFiles = (newFiles) => {
        setFiles((prev) => {
            const combined = [...prev, ...newFiles];

            // Remove duplicates
            return combined.filter(
                (file, index, self) =>
                    index ===
                    self.findIndex(
                        (f) =>
                            f.name === file.name &&
                            f.size === file.size &&
                            f.lastModified === file.lastModified
                    )
            );
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addFiles(Array.from(e.dataTransfer.files));
    };

    const handleFileChange = (e) => {
        addFiles(Array.from(e.target.files));
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    const handleUpload = async () => {
        if (!files.length) return;

        const CONCURRENT_UPLOADS = 5;
        let completed = 0;

        const uploadFile = async (file) => {
            const formData = new FormData();
            formData.append("files", file);

            await axios.post(API_URL, formData, {
                onUploadProgress: (event) => {
                    const percent = Math.round((event.loaded * 100) / event.total);

                    setProgress((prev) => ({
                        ...prev,
                        percent,
                    }));
                },
            });

            completed++;

            setProgress({
                completed,
                total: files.length,
                percent: Math.round((completed / files.length) * 100),
            });
        };

        const queue = [...files];

        const workers = new Array(CONCURRENT_UPLOADS).fill(null).map(async () => {
            while (queue.length) {
                const file = queue.shift();
                await uploadFile(file);
            }
        });

        await Promise.all(workers);

        setFiles([]);
        setProgress(null);
        handleClose();
        onUploadSuccess();
    };

    const renderPreview = (file) => {
        if (file.type.startsWith("image")) {
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{
                        width: viewMode === "grid" ? "100%" : "60px",
                        height: viewMode === "grid" ? "120px" : "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            );
        }

        if (file.type.includes("pdf"))
            return <FileEarmarkPdf size={40} className="text-danger" />;

        if (file.type.includes("text"))
            return <FileEarmarkText size={40} />;

        return <FileEarmark size={40} />;
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Upload Files</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {/* DROP AREA */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border border-2 border-primary rounded p-4 text-center bg-light mb-3"
                >
                    <h5>Drag & Drop files here</h5>
                    <p className="text-muted">or select below</p>
                    <input
                        type="file"
                        multiple
                        className="form-control mt-2"
                        onChange={handleFileChange}
                    />
                </div>

                {/* FILE STATS */}
                {files.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <strong>{files.length}</strong> files selected
                            <br />
                            <small className="text-muted">
                                Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB
                            </small>
                        </div>

                        <ToggleButtonGroup
                            type="radio"
                            name="view"
                            value={viewMode}
                            onChange={setViewMode}
                        >
                            <ToggleButton id="list" value="list" size="sm">
                                <List />
                            </ToggleButton>
                            <ToggleButton id="grid" value="grid" size="sm">
                                <Grid />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                )}

                {/* FILE PREVIEW AREA */}
                {files.length > 0 && (
                    <div
                        style={{
                            maxHeight: "280px",
                            overflowY: "auto",
                        }}
                        className={viewMode === "grid"
                            ? "d-grid gap-3"
                            : ""
                        }
                    >
                        {viewMode === "grid" ? (
                            <div className="row">
                                {files.map((file, index) => (
                                    <div key={index} className="col-4 mb-3">
                                        <div className="border rounded p-2 text-center position-relative">
                                            {renderPreview(file)}
                                            <div className="mt-2 small text-truncate">
                                                {file.name}
                                            </div>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-1"
                                                onClick={() => removeFile(index)}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            files.map((file, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center justify-content-between border rounded p-2 mb-2"
                                    style={{
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        {renderPreview(file)}
                                        <div>
                                            <div className="fw-semibold">
                                                {file.name}
                                            </div>
                                            <small className="text-muted">
                                                {(file.size / 1024).toFixed(2)} KB
                                            </small>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeFile(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* STICKY PROGRESS */}
                {progress?.total > 0 && (
                    <div className="mt-3">
                        Uploading {progress.completed} / {progress.total} files
                        <ProgressBar
                            now={progress.percent}
                            label={`${progress.percent}%`}
                            animated
                        />
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={files.length ? handleUpload : undefined}
                    style={{
                        cursor: files.length ? "pointer" : "not-allowed",
                        opacity: files.length ? 1 : 0.6
                    }}
                >
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
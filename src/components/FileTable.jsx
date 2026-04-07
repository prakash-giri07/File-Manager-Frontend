import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Download, Eye, Trash, FolderFill, FileEarmarkPdfFill, FileEarmarkImageFill, FileEarmarkTextFill, FileEarmarkFill } from "react-bootstrap-icons";
import { RiEditLine } from "react-icons/ri";
import { Menu, Item, useContextMenu, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const API_URL = "http://localhost:5000/api/files";
const MENU_ID = "file_context_menu";

const FileTable = forwardRef(({ searchTerm = "" }, ref) => {

    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newFileName, setNewFileName] = useState("");
    const [previewFile, setPreviewFile] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState([]);

    const { show } = useContextMenu({ id: MENU_ID });

    /* STORAGE CALCULATION */

    const totalStorageUsed = files.reduce((total, file) => total + file.size, 0);
    const usedMB = (totalStorageUsed / (1024 * 1024)).toFixed(2);
    const maxStorageMB = 15 * 1024;
    const usedPercent = ((usedMB / maxStorageMB) * 100).toFixed(2);

    /* FILTER */

    const filteredFiles = files.filter((file) =>
        file.originalname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* CONTEXT MENU */

    const getFileIcon = (file) => {

        if (file.isFolder) {
            return <FolderFill size={18} color="#fbbc04" />;
        }

        if (file.mimetype?.includes("pdf")) {
            return <FileEarmarkPdfFill size={18} color="#EA4335" />;
        }

        if (file.mimetype?.includes("image")) {
            return <FileEarmarkImageFill size={18} color="#34A853" />;
        }

        if (file.mimetype?.includes("text")) {
            return <FileEarmarkTextFill size={18} color="#4285F4" />;
        }

        return <FileEarmarkFill size={18} color="#5f6368" />;
    };

    const handleContextMenu = (event, file) => {
        event.preventDefault();
        show({
            event,
            props: { file }
        });
    };

    /* API CALLS */

    const fetchFiles = async () => {

        const res = await axios.get(API_URL, {
            params: { parent: currentFolder }
        });

        setFiles(res.data);
    };

    const renameFile = async (id) => {

        if (!newFileName.trim()) {
            alert("Filename cannot be empty");
            return;
        }

        try {

            const res = await axios.put(`${API_URL}/${id}`, {
                name: newFileName.trim()
            });

            setFiles((prev) =>
                prev.map((file) =>
                    file._id === id
                        ? { ...file, originalname: res.data.originalname }
                        : file
                )
            );

            setEditingId(null);
            setNewFileName("");

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchFiles();
    };

    const handleDownload = async (file) => {

        try {

            const response = await axios.get(
                `http://localhost:5000/${file.path}`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.originalname);

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Download error:", error);
        }
    };

    const deleteSelectedFiles = async () => {

        if (!window.confirm("Delete selected files?")) return;

        try {

            await Promise.all(
                selectedFiles.map((id) =>
                    axios.delete(`${API_URL}/${id}`)
                )
            );

            fetchFiles();
            setSelectedFiles([]);

        } catch (error) {
            console.error(error);
        }
    };

    /* SELECTION */

    const toggleSelect = (id) => {
        setSelectedFiles((prev) =>
            prev.includes(id)
                ? prev.filter((fileId) => fileId !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {

        if (selectedFiles.length === filteredFiles.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(filteredFiles.map((file) => file._id));
        }
    };

    /* EFFECTS */

    useImperativeHandle(ref, () => ({
        fetchFiles
    }));

    useEffect(() => {
        fetchFiles();
    }, [currentFolder]);

    /* UI */

    return (

        <div className="bg-white rounded shadow-sm p-3 h-100 d-flex flex-column">

            {currentFolder && (
                <Button
                    variant="light"
                    className="mb-3"
                    onClick={() => setCurrentFolder(null)}
                >
                    ← Back
                </Button>
            )}

            {selectedFiles.length > 0 && (
                <div className="mb-3">
                    <button
                        className="btn btn-danger"
                        onClick={deleteSelectedFiles}
                    >
                        Delete Selected ({selectedFiles.length})
                    </button>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">
                    {filteredFiles.length} files • {usedMB} MB used
                </span>
            </div>

            <div className="file-table-container flex-grow-1">

                <Table hover>

                    <thead className="bg-light">

                        <tr>

                            <th className="sticky-checkbox text-center fw-semibold">

                                <input
                                    type="checkbox"
                                    checked={
                                        filteredFiles.length > 0 &&
                                        selectedFiles.length === filteredFiles.length
                                    }
                                    onChange={toggleSelectAll}
                                />

                            </th>

                            <th className="sticky-name text-start fw-semibold">
                                Name
                            </th>

                            <th className="text-center size-col fw-semibold">
                                Size
                            </th>

                            <th className="text-center fw-semibold">
                                Modified
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredFiles.length === 0 ? (

                            <tr>
                                <td colSpan="4" className="text-center text-muted py-4">
                                    No matching files found
                                </td>
                            </tr>

                        ) : (

                            filteredFiles.map((file) => (

                                <tr
                                    key={file._id}
                                    onContextMenu={(e) => handleContextMenu(e, file)}
                                    onDoubleClick={() => {
                                        if (file.isFolder) {
                                            setCurrentFolder(file._id);
                                        } else {
                                            setPreviewFile(file);
                                        }
                                    }}
                                >

                                    <td className="sticky-checkbox text-center">

                                        <input
                                            type="checkbox"
                                            checked={selectedFiles.includes(file._id)}
                                            onChange={() => toggleSelect(file._id)}
                                        />

                                    </td>

                                    <td className="sticky-name">

                                        {editingId === file._id ? (

                                            <input
                                                className="form-control"
                                                value={newFileName}
                                                autoFocus
                                                onChange={(e) => setNewFileName(e.target.value)}
                                                onBlur={() => renameFile(file._id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") renameFile(file._id);
                                                    if (e.key === "Escape") setEditingId(null);
                                                }}
                                            />

                                        ) : (

                                            <span className="d-flex align-items-center gap-2">

                                                {file.isFolder && (
                                                    <FolderFill size={18} color="#FFC107" />
                                                )}

                                                {file.originalname}

                                            </span>

                                        )}

                                    </td>

                                    <td className="text-center size-col">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </td>

                                    <td className="text-center">
                                        {new Date(file.createdAt).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))
                        )}

                    </tbody>

                </Table>

            </div>

            <div className="mt-3">

                <div className="progress" style={{ height: "6px" }}>
                    <div
                        className="progress-bar"
                        style={{ width: `${usedPercent}%` }}
                    ></div>
                </div>

                <div className="text-muted mt-1" style={{ fontSize: "13px" }}>
                    {usedMB} MB of 15 GB used
                </div>

            </div>

            <Modal
                show={previewFile !== null}
                onHide={() => setPreviewFile(null)}
                centered
                size="lg"
            >

                <Modal.Header closeButton>
                    <Modal.Title>{previewFile?.originalname}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">

                    {previewFile && previewFile.mimetype.startsWith("image") && (
                        <img
                            src={`http://localhost:5000/${previewFile.path}`}
                            alt={previewFile.originalname}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "500px",
                                borderRadius: "6px"
                            }}
                        />
                    )}

                    {previewFile && previewFile.mimetype === "application/pdf" && (
                        <iframe
                            src={`http://localhost:5000/${previewFile.path}`}
                            width="100%"
                            height="500px"
                            title="PDF Preview"
                        />
                    )}

                </Modal.Body>

            </Modal>

            <Menu id={MENU_ID}>

                <Item onClick={({ props }) => setPreviewFile(props.file)}>
                    <Eye size={16} className="me-2" />
                    Open
                </Item>

                <Separator />

                <Item onClick={({ props }) => handleDownload(props.file)}>
                    <Download size={16} className="me-2" />
                    Download
                </Item>

                <Separator />

                <Item
                    onClick={({ props }) => {
                        setEditingId(props.file._id);
                        setNewFileName(props.file.originalname);
                    }}
                >
                    <RiEditLine size={16} className="me-2" />
                    Rename
                </Item>

                <Separator />

                <Item onClick={({ props }) => handleDelete(props.file._id)}>
                    <Trash size={16} className="me-2 text-danger" />
                    Delete
                </Item>

            </Menu>

        </div>
    );

});

export default FileTable;
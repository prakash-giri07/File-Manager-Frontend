import { useState } from "react";
import { Navbar, Container, Button, Form, InputGroup } from "react-bootstrap";
import { Upload, Search, FolderFill } from "react-bootstrap-icons";
import axios from "axios";
import UploadModal from "../components/UploadModal";

const API_URL = "http://localhost:5000/api/files";

export default function Topbar({ refreshFiles, searchTerm, setSearchTerm }) {
  const [showModal, setShowModal] = useState(false);

  const createFolder = async () => {
    const name = prompt("Enter folder name");
    if (!name || name.trim() === "") return;

    try {
      await axios.post(`${API_URL}/folder`, { name: name.trim() });
      refreshFiles();
    } catch (error) {
      console.error("Folder creation failed:", error);
    }
  };

  return (
    <>
      <Navbar bg="white" className="shadow-sm px-3 py-3">
        <Container fluid>

          <div className="d-flex flex-wrap align-items-center justify-content-between w-100 gap-2">

            {/* SEARCH */}
            <InputGroup className="flex-grow-1" style={{ maxWidth: "400px" }}>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>

              <Form.Control
                type="text"
                placeholder="Search in Drive"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            {/* ACTION BUTTONS */}
            <div className="d-flex gap-2 flex-wrap">

              <Button
                variant="secondary"
                onClick={createFolder}
              >
                <FolderFill className="me-2" />
                New Folder
              </Button>

              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
              >
                <Upload className="me-2" />
                Upload
              </Button>

            </div>

          </div>

        </Container>
      </Navbar>

      <UploadModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onUploadSuccess={refreshFiles}
      />
    </>
  );
}
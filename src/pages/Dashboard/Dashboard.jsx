import { useRef, useState } from "react";
import Topbar from "../../layout/Topbar";
import FileTable from "../../components/FileTable";

export default function Dashboard() {
    const fileTableRef = useRef();

    /* SEARCH STATE */
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="d-flex">

            <div className="flex-grow-1">

                <Topbar
                    refreshFiles={() => fileTableRef.current.fetchFiles()}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="p-4">
                    <FileTable
                        ref={fileTableRef}
                        searchTerm={searchTerm}
                    />
                </div>

            </div>
        </div>
    );
}
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useAdminLeadDetail } from "../../../hooks/Admin/useAdminLeadDetail";
import { formatDateTime } from "../../../utils/adminLeads";
import {
  AdminLeadContactForm,
  AdminLeadInfoCards,
  AdminLeadNotes,
  AdminLeadPipeline,
  AdminSendEmailModal,
} from "./AdminLeadSections";

/* eslint-disable react/prop-types */
export function adminLeadDetailTitle(lead) {
  return lead ? lead.name : "Lead";
}

export function adminLeadDetailSubtitle(lead) {
  return lead
    ? `${lead.email} · créé le ${formatDateTime(lead.createdAt)}`
    : "Fiche prospect";
}

function AdminLeadDetail({ leadId }) {
  const {
    lead,
    loading,
    error,
    success,
    status,
    setStatus,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    company,
    setCompany,
    message,
    setMessage,
    estimatedValue,
    setEstimatedValue,
    finalValue,
    setFinalValue,
    note,
    setNote,
    saving,
    mailOpen,
    mailSubject,
    setMailSubject,
    mailBody,
    setMailBody,
    mailError,
    sendingMail,
    diagnosticRows,
    handleSaveContact,
    handleSave,
    handlePipelineClick,
    handleAddNote,
    openMailModal,
    closeMailModal,
    handleSendEmail,
  } = useAdminLeadDetail(leadId);

  return (
    <AdminLayout
      title={adminLeadDetailTitle(lead)}
      subtitle={adminLeadDetailSubtitle(lead)}
    >
      <nav className="admin-breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/admin">Dashboard</Link>
        <span>/</span>
        <Link to="/admin/leads">Leads</Link>
        <span>/</span>
        <span aria-current="page">{lead?.name || "..."}</span>
      </nav>

      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      {success ? <p className="admin-success">{success}</p> : null}

      {loading ? (
        <p className="admin-muted">Chargement de la fiche...</p>
      ) : !lead ? (
        <p className="admin-muted">Lead introuvable.</p>
      ) : (
        <>
          <AdminLeadPipeline
            lead={lead}
            status={status}
            saving={saving}
            onPipelineClick={handlePipelineClick}
          />

          <div className="admin-detail-grid" style={{ marginTop: "1rem" }}>
            <AdminLeadContactForm
              lead={lead}
              name={name}
              email={email}
              phone={phone}
              company={company}
              message={message}
              saving={saving}
              onNameChange={setName}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onCompanyChange={setCompany}
              onMessageChange={setMessage}
              onSubmit={handleSaveContact}
              onOpenMail={openMailModal}
            />

            <AdminLeadInfoCards
              lead={lead}
              diagnosticRows={diagnosticRows}
              status={status}
              estimatedValue={estimatedValue}
              finalValue={finalValue}
              saving={saving}
              onStatusChange={setStatus}
              onEstimatedChange={setEstimatedValue}
              onFinalChange={setFinalValue}
              onSavePilot={handleSave}
            />
          </div>

          <AdminLeadNotes
            lead={lead}
            note={note}
            onNoteChange={setNote}
            onAddNote={handleAddNote}
          />

          {mailOpen ? (
            <AdminSendEmailModal
              lead={lead}
              mailSubject={mailSubject}
              mailBody={mailBody}
              mailError={mailError}
              sendingMail={sendingMail}
              onSubjectChange={setMailSubject}
              onBodyChange={setMailBody}
              onClose={closeMailModal}
              onSubmit={handleSendEmail}
            />
          ) : null}
        </>
      )}
    </AdminLayout>
  );
}

export default AdminLeadDetail;

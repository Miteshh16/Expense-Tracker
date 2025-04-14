import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6 gap-4">
        <button
          type="button"
          className="add-btn"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="add-btn add-btn-fill bg-red-600 hover:bg-red-700"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert

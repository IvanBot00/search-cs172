import React from 'react'

const SearchResult = ({ document }) => {
  return (
    <div className="document-container">
      <div className="document-info">
        <div className="document-title">
          {document._source.title} 
        </div>
        <div>
          Score: {document._score}
        </div>
      </div>
      {document._source.content}
    </div>
  )
}

export default SearchResult
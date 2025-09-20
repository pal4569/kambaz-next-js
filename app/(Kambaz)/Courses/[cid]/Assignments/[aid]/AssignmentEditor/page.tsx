export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea 
        id="wd-description"
        defaultValue={`The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.`}>
      </textarea>
      <br />
      <br />
      <table align="left">
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td align="left">
              <input id="wd-points" defaultValue={100} />
            </td>
            <td></td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option>Assignment Group</option>
              </select>
            </td>
            <td></td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-group">
                <option>Percentage</option>
              </select>
            </td>
            <td></td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-group">
                <option>Online</option>
              </select>
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td><label>Online Entry Options</label></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label><br />

              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label><br />

              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />

              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />

              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
            <td></td>
          </tr>
        <tr>
          <td></td>
          <td align="left">Assign to</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
              <input id="wd-assign-to" defaultValue={"Everyone"} />
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
              <label htmlFor="wd-group">Due</label>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="date" defaultValue="2024-05-13" id="wd-due-date"/>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td align="left"><text>Available</text></td>
          <td align="left"><text>Until</text></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="date" id="wd-available-from" defaultValue="2024-05-06" /></td>
          <td><input type="date" id="wd-available-until" defaultValue="2024-05-20" /></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <button type="button">Cancel</button>
            <button type="submit">Save</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
);}
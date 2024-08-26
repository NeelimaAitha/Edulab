const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFService {
  generateEventReport(event) {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '..', 'reports', `event_report_${event.id}.pdf`);

    doc.text(`Event Report: ${event.name}`);
    doc.text(`Description: ${event.description}`);
    doc.text(`Date: ${event.date}`);

    event.sessions.forEach(session => {
      doc.text(`Session: ${session.title}`);
      doc.text(`Duration: ${session.duration}`);
      session.speakers.forEach(speaker => {
        doc.text(`Speaker: ${speaker.name}`);
        doc.text(`Topic: ${speaker.topic}`);
      });
    });

    event.participants.forEach(participant => {
      doc.text(`Participant: ${participant.name }`);
      doc.text(`Email: ${participant.email}`);
    });

    doc.pipe(fs.createWriteStream(filePath));
    doc.end();

    return filePath;
  }
}

module.exports = PDFService;

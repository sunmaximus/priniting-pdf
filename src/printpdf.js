import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image'

export function printDetails(ref, fileName) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let height = pdf.internal.pageSize.height;
    let pageHeightInPixels = ref.clientHeight;
    let pageHeightInMM = pageHeightInPixels / 3.78;
    let pages = pageHeightInMM / height;
    const roundOff = Number(pages.toString().split('.')[1].substring(0, 1));
    const pageNo = (roundOff > 0 ? pages + 1 : pages);
    let pageCount = pages < 1 ? 1 : Math.trunc(pageNo);
    let imageHeight = height;
    domtoimage.toPng(ref, {
        height: ref.clientHeight,
        width: 665,
        style: {
            transform: 'unset',
            left: '0%',
            margin: 'unset',
            backgroundColor: 'white',
            maxHeight: '100%'
        },
    })
        .then(function (dataURL) {
            // hidePrintPreviewModal();
            for (let i = 1; i <= pageCount; i++) {
                let pdfStartingHeight = height * (i - 1);
                pdf.addImage(dataURL, 'JPEG', 30, -pdfStartingHeight, 160, ref.clientHeight);
                if (i < pageCount) {
                    pdf.addPage();
                }
            }
            pdf.save(`${fileName}.pdf`);
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}
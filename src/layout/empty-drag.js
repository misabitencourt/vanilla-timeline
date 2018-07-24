

export default tds => {

    tds.forEach(td => {
        td.addEventListener('mousedown', () => {
            window.timelineEmptyDragging = td;
            td.classList.add('timeline-drag-selection');
        });

        td.addEventListener('mouseover', () => {
            const startPoint = window.timelineEmptyDragging;
           
            if (! startPoint) {
                return;
            }
            if (startPoint.dataset.subjectItem !== td.dataset.subjectItem) {
                return;
            }

            td.classList.add('timeline-drag-selection');
            
            const isForward = (startPoint.dataset.dateItem*1) < (td.dataset.dateItem*1);            
            const allSelected = Array.from(
                td.parentElement.querySelectorAll('.timeline-drag-selection[data-type="empty"]')
            );

            if (isForward) {
                const olders = allSelected.filter(selectedTd => (selectedTd.dataset.dateItem*1) < (startPoint.dataset.dateItem*1));
                olders.forEach(oldTd => oldTd.classList.remove('timeline-drag-selection'));
                
                const moreNew = allSelected.filter(selectedTd => (selectedTd.dataset.dateItem*1) > (td.dataset.dateItem*1));
                moreNew.forEach(oldTd => oldTd.classList.remove('timeline-drag-selection'));
            } else {
                const newest = allSelected.filter(selectedTd => (selectedTd.dataset.dateItem*1) > (startPoint.dataset.dateItem*1));
                newest.forEach(newestTd => newestTd.classList.remove('timeline-drag-selection'));

                const moreOld = allSelected.filter(selectedTd => (selectedTd.dataset.dateItem*1) < (td.dataset.dateItem*1));
                moreOld.forEach(oldTd => oldTd.classList.remove('timeline-drag-selection'));
            }
        });
    });


    document.addEventListener('mouseup', () => {
        delete window.timelineEmptyDragging;
    });

}
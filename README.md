# vanilla-timeline
Vanilla es6 table timeline component

# Code sample
javascript`   
    let targetDiv = document.getElementById('target-element')
    createBookingMap({
        el: targetDiv,
        data: timelineData // See in ./dist/sample/sample-data.json
    })
`

# Adding dom events
javascript`
    let subjectItem = 
        targetDiv.querySelector('[data-subject-item="ROOM-01"]');

    subjectItem.addEventListener('click', () => alert('Clicked!!'))
`

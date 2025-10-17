**TODOS before publish:**

    - Make use of command execution ()
    - implement local JSON Storage ()
    - edit user friendly readme ()
    - make showtable page selectable, editable and removeable ()
    - let users create different projects -> able to create tickets for the specific project (therefore refactor the cli menu) ()

    - Publish

TODO today:

- Important: Mach eine komplett neue showTickets ansicht, hier mehr infos:

  - Mache daraus kein tabel, sondern checkboxen mit allen tickets die du bisher hast. man kann dann die checkboxen wählen ()

    - dann brauchst auch kein showTicketsMenu mehr, übernehm da ggf paar logiken wie clear etc
    - dennoch per esc clearbar machen ()
    - die ui dazu clean halten ()
    - gecheckten checkboxen löschbar machen ()
    - delete prompt table package

    PROBLEM: wenn ich ticket erstelle, schließt danahc terminal

Feature Idea:

- Create Settings option (in main menu) so people can can customize the cli how they want
  - things to customize: colors, tags (like urgency, cost...)

**Important info:**
maybe dangerous handling of process.stdin.setRawMode`s througout showTicketMenu & index.js. Maybe learn a bit more about it and watch out

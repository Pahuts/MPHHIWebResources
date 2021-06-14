function moveAfter(field1, field2) {    // Field 1 AFTER Field 2
  field1.closest("td").insertAfter(field2.closest("td"));
}
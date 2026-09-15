UPDATE services
SET delivery_hours = CASE
  WHEN delivery_hours IS NOT NULL AND delivery_hours <> 0 THEN TRUE
  ELSE FALSE
END;

ALTER TABLE services
  MODIFY delivery_hours BOOLEAN NOT NULL DEFAULT FALSE;

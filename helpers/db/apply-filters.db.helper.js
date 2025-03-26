const { and, eq, sql } = require("drizzle-orm");
const { formats } = require("../format.helper");

function applyFilters(query, filters, entity) {
  const filtersSubqueries = Object.entries(filters)
    .map(([key, value]) => {
      const loweredKey = formats.lowercase(key);
      if (Array.isArray(value)) {
        return sql.raw(
          `"${entity}"."${loweredKey}" && ARRAY['${value
            .map((item) => formats.lowercase(item))
            .join("','")}']`
        );
      }

      return eq(
        sql.raw(`"${entity}"."${loweredKey}"`),
        formats.lowercase(value)
      );
    })
    .filter(Boolean);

  return query.where(and(...filtersSubqueries));
}

module.exports = { applyFilters };

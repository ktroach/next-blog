"use client"

// Lists all organization the user is a member of.
// Each entry can be a link to a page to manage organization
// members.

// If you create a new Organization, this list will update automatically.
import Link from "next/link"
import { useOrganizationList } from "@clerk/nextjs"

export function OrganizationList() {
  const { organizationList, isLoaded } = useOrganizationList()

  if (!isLoaded) {
    return null
  }

  return (
    <div>
      <h3 className="py-4">Your Organizations</h3>
      <hr />
      {organizationList.length === 0 ? (
        <div>You do not belong to any organizations yet.</div>
      ) : (
        <div className="py-4">
          <ul>
            {organizationList.map(({ organization }) => (
              <li key={organization.id}>
                <Link
                  href={`/admin/users/${organization.id}`}
                  legacyBehavior
                >
                  <a className="font-semibold uppercase">{organization.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

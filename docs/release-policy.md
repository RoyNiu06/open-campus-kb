# Release Policy

OpenCampusKB versions may follow the CityUInfo production baseline loosely, but they do not need to match every patch.

## Versioning

- Patch: bug fixes, copy changes, low-risk UI improvements.
- Minor: new reusable workflow, admin feature, ingestion capability, or schema addition.
- Major: architecture, API, or deployment model changes.

## Practical Rule

CityUInfo can receive several small production updates first. OpenCampusKB may then jump from one public version to a later version after the changes are generalized.

Example:

```text
CityUInfo production: v2.0.0 -> v2.0.1 -> v2.0.2
OpenCampusKB: v2.0.0-example -> v2.1.0
```

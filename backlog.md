## EPIC 1 — Strona główna i nawigacja

### **PBI 1.1 – Wyświetlenie layoutu strony głównej**

* **User story:**
  Jako użytkownik chcę zobaczyć stronę główną z mapą Leaflet, listą filtrów oraz polem wyszukiwania, aby łatwo zlokalizować osoby i wydarzenia.
* **Kryteria akceptacji:**

  1. Given otwieram stronę główną, When strona się ładuje, Then widzę header, tytuł, mapę Leaflet, listę filtrów i input do wyszukiwania.
  2. Given brak danych z backendu, When strona się ładuje, Then mapa i lista pokazują placeholdery.
  3. Given wpisuję tekst w polu wyszukiwania lub wybieram kategorię, When filtr działa, Then lista i mapa aktualizują się dynamicznie.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

### **PBI 1.2 – Nawigacja między podstronami**

* **User story:**
  Jako użytkownik chcę mieć w headerze trzy przyciski („Osoby”, „Wydarzenia”, „Generator QR”), żeby łatwo przejść do odpowiednich sekcji aplikacji.
* **Kryteria akceptacji:**

  1. Given widzę trzy przyciski, When kliknę w jeden, Then jestem przekierowany do odpowiedniej podstrony.
  2. Given najeżdżam myszką na przycisk, When hover, Then przyciski mają efekt wizualny (np. zmiana koloru, podkreślenie).
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 1.3 – Ochrona generatora QR (dostęp tylko dla admina)**

* **User story:**
  Jako administrator chcę mieć możliwość dostępu do generatora QR, a użytkownicy nie-admini mają być do niego zablokowani, aby zabezpieczyć funkcjonalność generowania kodów QR.
* **Kryteria akceptacji:**

  1. Given nie jestem zalogowany jako admin, When kliknę „Generator QR”, Then dostęp jest zablokowany / następuje przekierowanie.
  2. Given jestem zalogowany jako admin, When kliknę „Generator QR”, Then mogę wejść na stronę generatora QR.
  3. Given loguję się jako admin poprawnym loginem i hasłem, When zalogowanie się powiedzie, Then ustawiane jest cookie / sesja z rolą admina.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

---

## EPIC 2 — Osoby („People”)

### **PBI 2.1 – Lista osób**

* **User story:**
  Jako użytkownik chcę zobaczyć listę wszystkich osób, żeby móc przeglądać i wybierać konkretnych ludzi.
* **Kryteria akceptacji:**

  1. Given przechodzę do strony „Osoby” (np. `/people`), When strona się ładuje, Then lista osób jest pobrana z backendu i wyświetlona.
  2. Given backend zwraca pustą listę, When strona się ładuje, Then wyświetlany jest placeholder / komunikat „Brak osób”.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 2.2 – Wyszukiwanie osób**

* **User story:**
  Jako użytkownik chcę wyszukiwać osoby po imieniu, nazwisku lub innych polach, żeby szybko znaleźć interesujące mnie postacie.
* **Kryteria akceptacji:**

  1. Given lista osób jest wyświetlona, When wpisuję tekst w pole wyszukiwania, Then lista filtruje się dynamicznie według wpisanego tekstu.
  2. Given wpisany tekst nie pasuje do żadnej osoby, Then UI wyświetla komunikat „Nic nie znaleziono”.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 2.3 – Strona szczegółowa osoby**

* **User story:**
  Jako użytkownik chcę zobaczyć szczegółowe informacje o danej osobie na jej stronie (np. `/people/[id]`), żeby poznać jej opis i zobaczyć zdjęcie.
* **Kryteria akceptacji:**

  1. Given klikam w daną osobę na liście, When przechodzę do jej podstrony, Then widzę jej imię, nazwisko, opis i zdjęcie (jeśli jest).
  2. Given zdjęcie nie ładuje się lub nie istnieje, Then pokazuje się fallback (np. placeholder obrazka).
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 2.4 – Mapa na stronie osoby**

* **User story:**
  Jako użytkownik chcę zobaczyć lokalizację danej osoby na mapie Leaflet na jej stronie, żeby wiedzieć, gdzie była lub jest powiązana geograficznie.
* **Kryteria akceptacji:**

  1. Given jestem na stronie konkretnej osoby, Then komponent Leaflet wyświetla mapę.
  2. Given dane lokalizacji osoby, Then na mapie pojawia się marker w odpowiednim miejscu.
  3. Given klikam marker, Then tooltip lub popup pokazuje nazwę osoby i możliwy link / informację.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

---

## EPIC 3 — Wydarzenia („Events”)

### **PBI 3.1 – Lista wydarzeń**

* **User story:**
  Jako użytkownik chcę zobaczyć listę wydarzeń, żeby wiedzieć, co się dzieje i wybrać interesujące eventy.
* **Kryteria akceptacji:**

  1. Given przechodzę do strony „Wydarzenia” (np. `/events`), When się ładuje, Then lista wydarzeń jest pobrana z backendu i pokazana (nazwa + data/godzina).
  2. Given backend nie ma wydarzeń, Then pokazuje się placeholder / komunikat „Brak wydarzeń”.
* **Priorytet:** Średni
* **Szacowanie:** 2 SP

### **PBI 3.2 – Strona szczegółowa wydarzenia**

* **User story:**
  Jako użytkownik chcę zobaczyć szczegóły wydarzenia (opis, data, ewentualne zdjęcie) po kliknięciu, żeby lepiej zrozumieć, na czym polega event.
* **Kryteria akceptacji:**

  1. Given klikam wydarzenie na liście, When przechodzę na stronę wydarzenia, Then widzę jego nazwę, datę/godzinę i opis.
  2. Given zdjęcie nie istnieje lub się nie ładuje, Then wyświetlany jest placeholder.
* **Priorytet:** Średni
* **Szacowanie:** 1 SP

### **PBI 3.3 – Mapa wydarzenia**

* **User story:**
  Jako użytkownik chcę zobaczyć lokalizację wydarzenia na mapie Leaflet na jego stronie, żeby łatwo zlokalizować miejsce eventu.
* **Kryteria akceptacji:**

  1. Given jestem na stronie konkretnego wydarzenia, Then mapa Leaflet jest renderowana.
  2. Given dane lokalizacyjne wydarzenia, Then marker jest umieszczony w odpowiednich współrzędnych.
  3. Given klikam marker, Then popup / tooltip pokazuje nazwę wydarzenia lub inne dane (np. data).
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

---

## EPIC 4 — Generator QR (tylko admin)

### **PBI 4.1 – Lista kategorii w generatorze QR**

* **User story:**
  Jako administrator chcę zobaczyć listę kategorii („Osoby”, „Wydarzenia”), aby wybrać typ, dla którego chcę wygenerować QR.
* **Kryteria akceptacji:**

  1. Given jestem adminem i wchodzę na stronę generatora QR, When strona się ładuje, Then widzę listę kategorii.
  2. Given lista kategorii, When wybieram jedną kategorię, Then lista elementów (osób / eventów) zmienia się zgodnie z kategorią.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 4.2 – Lista elementów po wyborze kategorii**

* **User story:**
  Jako administrator chcę zobaczyć wszystkie osoby lub wydarzenia w danej kategorii, żeby móc wybrać, dla czego wygenerować QR.
* **Kryteria akceptacji:**

  1. Given wybrałem kategorię „Osoby”, Then widzę listę wszystkich osób.
  2. Given wybrałem kategorię „Wydarzenia”, Then widzę listę wszystkich wydarzeń.
  3. Given lista jest długa, Then lista elementów powinna być przewijalna lub mieć pagination / lazy load.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 4.3 – Generowanie QR**

* **User story:**
  Jako administrator chcę wygenerować kod QR dla wybranego elementu (osoby lub wydarzenia), żeby stworzyć fizyczną tabliczkę z QR.
* **Kryteria akceptacji:**

  1. Given wybrałem konkretną osobę lub wydarzenie, When kliknę „Generuj QR”, Then kod QR się generuje i wyświetla.
  2. Given QR został wygenerowany, Then kod QR jest widoczny jako grafik (np. SVG lub canvas) i możliwy do zapisania/przeglądania.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

### **PBI 4.4 – Karta do druku (nazwa + QR)**

* **User story:**
  Jako administrator chcę wydrukować kartę zawierającą nazwę elementu i QR, żeby umieścić ją fizycznie na tabliczce.
* **Kryteria akceptacji:**

  1. Given QR jest wygenerowany, Then strona lub komponent pokazuje nazwę elementu + QR w layoucie przygotowanym do druku.
  2. Given klikam „Drukuj”, When otwiera się print layout, Then karta jest odpowiednio sformatowana (np. marginesy, wielkość kodu) do druku.
* **Priorytet:** Średni
* **Szacowanie:** 2 SP

### **PBI 4.5 – Funkcja “Drukuj”**

* **User story:**
  Jako administrator chcę mieć przycisk „Drukuj”, żeby wygodnie wydrukować kartę QR bez ręcznego uruchamiania opcji przeglądarki.
* **Kryteria akceptacji:**

  1. Given karta QR + nazwa jest wyświetlona, When kliknę „Drukuj”, Then wywołuje się `window.print()` lub inna metoda, aby otworzyć dialog drukowania.
  2. Given layout do druku, Then elementy (QR + tekst) są dobrze rozmieszczone i nie ulegają przycięciu na wydruku.
* **Priorytet:** Średni
* **Szacowanie:** 1 SP

---

## EPIC 5 — Panel admina do zarządzania danymi

### **PBI 5.1 – Strona “Dodaj osobę”**

* **User story:**
  Jako administrator chcę mieć stronę `/admin/add-person`, żeby dodać nowe osoby do aplikacji.
* **Kryteria akceptacji:**

  1. Given jestem adminem i wchodzę na `/admin/add-person`, Then widzę formularz z polami: imię, nazwisko, opis, lokalizacja (lat/lng), zdjęcie, inne metadane.
  2. Given wypełniam formularz i klikam „Dodaj”, Then wysyłany jest request do API Next.js, a nowa osoba zostaje zapisana w bazie danych.
  3. Given brak uprawnień lub nie-admin, Then dostęp do tej strony jest zablokowany / przekierowany.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

### **PBI 5.2 – Strona “Dodaj wydarzenie”**

* **User story:**
  Jako administrator chcę mieć stronę `/admin/add-event`, żeby dodać nowe wydarzenia do serwisu.
* **Kryteria akceptacji:**

  1. Given jestem adminem i wchodzę na `/admin/add-event`, Then widzę formularz z polami: nazwa wydarzenia, data/godzina, opis, lokalizacja (lat/lng), opcjonalne zdjęcie.
  2. Given wypełniam formularz i klikam „Dodaj”, Then wysyłany jest request do API i wydarzenie zostaje zapisane.
  3. Given brak uprawnień lub nie-admin, Then nie mogę wejść na tę stronę.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

### **PBI 5.3 – Walidacja formularza**

* **User story:**
  Jako administrator chcę, żeby formularze “Dodaj osobę” i “Dodaj wydarzenie” były walidowane, żeby nie dodać niekompletnych lub błędnych danych.
* **Kryteria akceptacji:**

  1. Given formularz, When nie wypełnię wymaganych pól (np. imię / nazwa), Then pokazuje się komunikat błędu i nie mogę submitować.
  2. Given pola lokalizacji, When wpiszę niepoprawny format współrzędnych, Then walidacja wykrywa błąd.
  3. Given pole zdjęcia, When zdjęcie jest za duże lub nieodpowiedniego typu, Then walidacja odrzuca plik i pokazuje komunikat.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP

### **PBI 5.4 – API Next.js do zapisu danych**

* **User story:**
  Jako administrator chcę, żeby aplikacja miała endpointy API w Next.js (`/api`) do tworzenia nowych osób i wydarzeń, żeby dane były zapisywane w bazie.
* **Kryteria akceptacji:**

  1. Given wysyłam request POST na `/api/people` z danymi osoby, Then osoba zostaje zapisana w bazie danych.
  2. Given wysyłam request POST na `/api/events` z danymi wydarzenia, Then wydarzenie zostaje zapisane.
  3. Given request od użytkownika bez roli admin, Then API odrzuca request (np. 403 Forbidden).
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

---

## EPIC 6 — Mapy i komponenty Leaflet

### **PBI 6.1 – Komponent mapy Leaflet**

* **User story:**
  Jako developer chcę mieć reużywalny komponent mapy Leaflet w Next.js, żeby używać go w wielu miejscach (strona główna, podstrony osób, wydarzeń).
* **Kryteria akceptacji:**

  1. Given komponent otrzymuje współrzędne (lub pustą listę), Then renderuje mapę Leaflet.
  2. Given brak współrzędnych / pusty zestaw danych, Then mapa pokazuje placeholder lub domyślne centrum.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

### **PBI 6.2 – Markery dynamiczne na mapie głównej**

* **User story:**
  Jako użytkownik chcę, żeby na mapie głównej były markery dla wszystkich osób i wydarzeń, które są aktualnie w bazie, żeby łatwo zobaczyć ich lokalizacje.
* **Kryteria akceptacji:**

  1. Given dane osób i wydarzeń z backendu, Then komponent mapy tworzy markery w odpowiednich pozycjach.
  2. Given filtry (kategoria „Osoby” / „Wydarzenia”), Then markery są filtrowane i pokazują tylko te pasujące do wybranej kategorii.
* **Priorytet:** Wysoki
* **Szacowanie:** 3 SP

### **PBI 6.3 – Interakcja markera**

* **User story:**
  Jako użytkownik chcę móc kliknąć marker na mapie i wyświetlić nazwę osoby lub wydarzenia oraz link do ich podstrony, żeby łatwo przejść do szczegółów.
* **Kryteria akceptacji:**

  1. Given marker jest wyświetlony, When kliknę go, Then pojawia się popup / tooltip z nazwą oraz linkiem.
  2. Given kliknę link w popup, Then następuje nawigacja do podstrony osoby / wydarzenia.
* **Priorytet:** Wysoki
* **Szacowanie:** 2 SP


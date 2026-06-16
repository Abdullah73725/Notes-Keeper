package com.tyss.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tyss.entity.Note;
import com.tyss.entity.User;

public interface NoteRepository extends JpaRepository<Note, Long> {

	List<Note> findByUser(User user);
	
	Optional<Note> findById(Long id);
}
